using ActivityTracker.API.Service;
using ActivityTracker.EntityFrameworkCore;
using ActivityTracker.EntityFrameworkCore.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace ActivityTracker.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserActivityController : ControllerBase
    {
        private const string USER_HEADER = "X-User";

        /// <summary>
        /// Create activity
        /// </summary>
        ///<remarks>
        ///Example utn: 1986
        /// ```
        /// { 
        ///     "Quantity": 4000,
        ///     "ActivityTypeCode": "Walk",
        ///     "ExternalId": "mike_test_2",
        ///     "CreationDate": null 
        /// }
        /// ```
        /// CreationDate : DateTime.NowUTC si non spécifiée.
        /// ExternalId : Unique identifier of the activity in the external system or on the local device to avoir duplicate activities
        /// </remarks>
        /// <param name="userUtn">UTN of the user to add an activity for</param>
        /// <param name="createActivityParameter">Champs requis pour créer une activité (ActivityTypeCode, Quantity, ExternalId et CreationDate.</param>
        /// <returns></returns>
        /// <response code="200">Success. Unique identifier (BatchNumber) of the enveloppe submitted in the body ‘M’yyMMddHHmmss####. Ex: M1905150947320101</response>
        /// <response code="400">Enveloppe JSON not provided in the body or missing required fields</response>
        /// <response code="500">Internal server error</response>
        [HttpPost]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
        public IActionResult Create([FromHeader(Name = USER_HEADER)] int userUtn, [FromBody] CreateActivityParameter createActivityParameter)
        {
            var user = GetUserBytUtn(userUtn);

            try
            {
                CreateUserActivity(user, createActivityParameter);

                BadgeService.GeneraterNewBadges(user.UserID);
                CommunicationService.GenerateNewCommunications(user.UserID);
            }
            catch (NotExistingUserException)
            {
                return BadRequest(new ProblemDetails                 {
                    Type = "https://www.support.ch/problems/NotExistingUserException",
                    Title = HttpStatusCode.BadRequest.ToString(),
                    Status = (int)HttpStatusCode.BadRequest,
                    Detail = $"No user with the UTN [{userUtn}] exist.",
                    Instance = HttpContext.Request?.Path
                });
            }
            catch (AlreadyExistingUserActivityException)
            {
                return BadRequest(new ProblemDetails
                {
                    Type = "https://www.support.ch/problems/AlreadyExistingUserActivity",
                    Title = HttpStatusCode.BadRequest.ToString(),
                    Status = (int)HttpStatusCode.BadRequest,
                    Detail = $"An activity with the externalId [{createActivityParameter.ExternalId}] already exist and we don't allow duplicates.",
                    Instance = HttpContext.Request?.Path
                }); 
            }
            catch (NotExistingActivityTypeCodeException)
            {
                return BadRequest(new ProblemDetails
                {
                    Type = "https://www.support.ch/problems/NotExistingActivityTypeCode",
                    Title = HttpStatusCode.BadRequest.ToString(),
                    Status = (int)HttpStatusCode.BadRequest,                   
                    Detail = $"Invalid Activity Type Code : [{createActivityParameter.ActivityTypeCode}]",
                    Instance = HttpContext.Request?.Path
                });
            }
            catch (Exception)
            {
                var result = new ObjectResult(new ProblemDetails
                {
                    Type = "https://www.assupportsura.ch/problems/NotExistingActivityTypeCode",
                    Title = HttpStatusCode.InternalServerError.ToString(),
                    Status = (int)HttpStatusCode.InternalServerError,
                    Detail = "Invalid Activity Type Code",
                    Instance = HttpContext.Request?.Path
                });
                result.StatusCode = (int)HttpStatusCode.InternalServerError;
                return result;
            }

            return Ok();
        }

        /// <summary>
        /// Méthode réutilisable pour créer une activité
        /// </summary>
        /// <param name="user"></param>
        /// <param name="createActivityParameter"></param>
        private void CreateUserActivity(User user, CreateActivityParameter createActivityParameter)
        {
            var type = GetActivityTypeByCode(createActivityParameter.ActivityTypeCode);
            ValidateUserActivityCreation(user, type, createActivityParameter);

            var activity = new UserActivity
            {
                UserID = user.UserID,
                ActivityTypeID = type.ActivityTypeID,
                Date = createActivityParameter.CreationDate ?? DateTime.UtcNow,
                Quantity = createActivityParameter.Quantity,
                ExternalID = createActivityParameter.ExternalId
            };
            AdjustHealthPoints(activity, type);

            using (var dbContext = new ActivityTrackerDbContext())
            {
                dbContext.UserActivities.Add(activity);
                dbContext.SaveChanges();
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <param name="type"></param>
        /// <param name="createActivityParameter"></param>
        private void ValidateUserActivityCreation(User user, ActivityType type, CreateActivityParameter createActivityParameter)
        {
            if (type == null) { throw new NotExistingActivityTypeCodeException(); }
            if (ActivityAlreadyExist(createActivityParameter.ExternalId)) { throw new AlreadyExistingUserActivityException(); }
        }

        private User GetUserBytUtn(int utn)
        {
            using (var dbContext = new ActivityTrackerDbContext())
            {
                return dbContext.Users.FirstOrDefault(u => u.UTN == utn);
            }
        }

        private ActivityType GetActivityTypeByCode(string activityTypeCode)
        {
            using (var dbContext = new ActivityTrackerDbContext())
            {
                return dbContext.ActivityTypes.FirstOrDefault(type => type.Code == activityTypeCode);
            }
        }

        private bool ActivityAlreadyExist(string externalId)
        {
            using (var dbContext = new ActivityTrackerDbContext())
            {
                return externalId != null && dbContext.UserActivities.Any(activity => externalId == activity.ExternalID);
            }
        }

        /// <summary>
        /// Assume we do calculation on the same day of the activity was made. Activities in the past isn't possible, 
        /// the activity should be sent on the same day or retrieved on the same day in an external system
        /// </summary>
        /// <param name="activity"></param>
        /// <param name="type"></param>
        private void AdjustHealthPoints(UserActivity activity, ActivityType type)
        {
            using (var dbContext = new ActivityTrackerDbContext())
            {
                var todayUserActivites = dbContext.UserActivities.Where(activity =>
                    activity.UserID.Equals(activity.UserID) &&
                    activity.Date > DateTime.UtcNow.Date);

                int todayAccumulatedHealthPoints = todayUserActivites.Sum(activity => activity.HealthPoints);
                if (todayAccumulatedHealthPoints < Constants.MAX_HEALTH_POINTS_PER_DAY)
                {   // Max HealthPoints per day not reatch, add points up to the maximum remaining (Hackathon doesn't care about parrallel calls that could go over maximum)
                    int calculatedPointsForTheActivity = (int)Math.Floor(activity.Quantity * type.QuantityMultiplier);
                    int maximumAllowableHealthPoints = Constants.MAX_HEALTH_POINTS_PER_DAY - todayAccumulatedHealthPoints;
                    activity.HealthPoints = Math.Min(calculatedPointsForTheActivity, maximumAllowableHealthPoints);
                }
            }
        }
    }
}
