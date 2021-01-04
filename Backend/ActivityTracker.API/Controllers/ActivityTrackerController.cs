using ActivityTracker.API.Service;
using ActivityTracker.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ActivityTracker.API.Controllers
{    
    [ApiController]
    [Route("[controller]")]
    public class ActivityTrackerController : ControllerBase
    {      
        private const string USER_HEADER = "X-User";
        private readonly ActivityTrackerDbContext _dbContext;

        public ActivityTrackerController(ActivityTrackerDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        /// <summary>
        /// Test method
        /// </summary>
        ///<remarks>
        ///Example utn: 1986
        /// </remarks>
        /// <param name="utn"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<UserDataDto>> GetAllDataByUser([FromHeader(Name = USER_HEADER)]int utn)
        {
            var levels = await _dbContext.Levels.ToListAsync();
            var user  = await _dbContext.Users.Include(u => u.UserActivities).ThenInclude(ua => ua.ActivityType)
                                         .Include(u => u.UserBadges).ThenInclude(ub => ub.Badge)
                                         .Include(u => u.UserLevels).ThenInclude(ul => ul.Level)
                                         .Include(u => u.UserCommunications).ThenInclude(uc => uc.Communication)
                                         .FirstOrDefaultAsync(u => u.UTN == utn);

            if (user == null)
            {
                return this.NotFound();
            }
            else
            {
                var result = new UserDataDto();

                var today = DateTime.Now;
                var previousMonth = today.AddMonths(-1);
                var previousWeek = DateTime.Now.AddDays(-7);

                result.ActivityCounter = new UserDataActivityCounterDto()
                {
                    CurrentMonth = user.UserActivities.Count(ua => (ua.Date.Month == today.Month) && (ua.Date.Year == today.Year)),
                    PreviousMonth = user.UserActivities.Count(ua => (ua.Date.Month == previousMonth.Month) && (ua.Date.Year == previousMonth.Year)),
                    CurrentWeek = user.UserActivities.Count(ua => (ua.Date >= StartOfWeek(today))),
                    PreviousWeek = user.UserActivities.Count(ua => (ua.Date >= StartOfWeek(previousWeek)) &&
                                                                   (ua.Date < StartOfWeek(today)))
                };

                result.ActivityChart = new UserDataActivityChartDto()
                {
                    ByDay = new List<UserDataActivityChartDayDto>(),
                    ByWeek = new List<UserDataActivityChartWeekDto>()
                };

                for (int i = 6; i >= 0; i--)
                {
                    result.ActivityChart.ByDay.Add(new UserDataActivityChartDayDto()
                    {
                        Date = today.AddDays(-i).Date,
                        Value = user.UserActivities.Count(ua => ua.Date.Date == today.AddDays(-i).Date)
                    });
                }

                for (int i = 7; i >= 0; i--)
                {
                    var monday = StartOfWeek(today.AddDays(-i * 7)).Date;

                    result.ActivityChart.ByWeek.Add(new UserDataActivityChartWeekDto()
                    {
                        WeekNumber = CultureInfo.InvariantCulture.Calendar.GetWeekOfYear(monday, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday),
                        Value = user.UserActivities.Count(ua => (ua.Date.Date >= monday) && (ua.Date.Date < monday.AddDays(7)))
                    });
                }



                var todayActivities = user.UserActivities.Where(ua => ua.Date.Date == today.Date);

                result.User = new UserDataUserDto()
                {
                    AvatarUrl = user.AvatarUrl,
                    FullName = user.Name,
                    Age = (user.Birthdate.HasValue) ? GetAge(user.Birthdate.Value) : 0,
                    DayPoints = todayActivities.Any() ? todayActivities.Sum(ta => ta.HealthPoints) : 0
                };

                var currentUserLevel = user.UserLevels.OrderByDescending(ul => ul.Date).First().Level;
                var nextLevel = levels.Where(l => l.LevelID > currentUserLevel.LevelID).FirstOrDefault();

                result.LevelInfos = new UserDataLevelInfosDto();
                result.LevelInfos.CurrentLevel = currentUserLevel.LevelID;
                result.LevelInfos.CurrentLevelGift = $"Rabais de {currentUserLevel.LevelID} % sur votre LAMal";
                result.LevelInfos.CurrentPoints = user.HealthPoints;
                result.LevelInfos.LevelMinPoints = currentUserLevel.ExperienceRequirement;
                if (nextLevel != null)
                {
                    result.LevelInfos.NextLevel = nextLevel.LevelID;
                    result.LevelInfos.LevelMaxPoints = nextLevel.ExperienceRequirement;
                }

                result.RecentActivity = new List<UserDataRecentActivityDto>();
                
                //Badges
                foreach(var bu in user.UserBadges)
                {
                    result.RecentActivity.Add(
                        new UserDataRecentActivityDto()
                        {
                            Date = bu.Date,
                            Description = bu.Badge.Name,
                            Type = "badge",
                            IconUrl = bu.Badge.ImageUrl
                        });
                }

                //Activités
                foreach (var au in user.UserActivities)
                {
                    result.RecentActivity.Add(
                        new UserDataRecentActivityDto()
                        {
                            Date = au.Date,
                            Description = $"{au.ActivityType.Name} de {au.Quantity} {au.ActivityType.Unit}",
                            Type = "activity",
                            PointsWon = au.HealthPoints
                        });
                }

                //Communication
                foreach(var uc in user.UserCommunications)
                {
                    result.RecentActivity.Add(
                        new UserDataRecentActivityDto()
                        {
                            Date = uc.Date,
                            Description = uc.Communication.Description,
                            Title = uc.Communication.Title,
                            Type = "communication",
                            ImageUrl = uc.Communication.ImageUrl,
                            Link = uc.Communication.Url
                        });
                }

                //Communication (Level-up)
                foreach (var ul in user.UserLevels)
                {
                    result.RecentActivity.Add(
                        new UserDataRecentActivityDto()
                        {
                            Date = ul.Date,
                            Description = $"Vous avez atteint le niveau {ul.Level.LevelID}",
                            Title = $"Vous avez atteint le niveau {ul.Level.LevelID}",
                            Type = "communication",
                            ImageUrl = ul.Level.ImageUrl
                        });
                }

                result.RecentActivity = result.RecentActivity.OrderByDescending(ra => ra.Date).ToList();

                return Ok(result);
            }     
        }

        private static DateTime StartOfWeek(DateTime dt)
        {
            int diff = (7 + (dt.DayOfWeek - DayOfWeek.Monday)) % 7;
            return dt.AddDays(-1 * diff).Date;
        }

        private int GetAge(DateTime birthdate)
        {
            var today = DateTime.Now;

            var age = today.Year - birthdate.Year;

            // Go back to the year in which the person was born in case of a leap year
            if (birthdate.Date > today.AddYears(-age)) age--;

            return age;
        }
    }

    public class UserDataDto
    {
        public UserDataActivityChartDto ActivityChart { get; set; }
        public UserDataActivityCounterDto ActivityCounter { get; set; }
        public UserDataLevelInfosDto LevelInfos { get; set; }
        public UserDataUserDto User { get; set; }
        public List<UserDataRecentActivityDto> RecentActivity { get; set; }
    }

    public class UserDataActivityChartDto
    {
        public List<UserDataActivityChartDayDto> ByDay { get; set; }
        public List<UserDataActivityChartWeekDto> ByWeek { get; set; }
    }

    public class UserDataActivityChartDayDto
    {
        public int Value { get; set; }

        [JsonConverter(typeof(DateOnlyConverter))]
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }
    }

    public class UserDataActivityChartWeekDto
    {
        public int Value { get; set; }
        public int WeekNumber { get; set; }
    }

    public class UserDataActivityCounterDto
    {
        public int CurrentMonth { get; set; }
        public int PreviousMonth { get; set; }
        public int CurrentWeek { get; set; }
        public int PreviousWeek { get; set; }
    }

    public class UserDataLevelInfosDto
    {
        public int CurrentLevel { get; set; }
        public string CurrentLevelGift { get; set; }
        public int CurrentPoints { get; set; }
        public int? NextLevel { get; set; }
        public int LevelMinPoints { get; set; }
        public int? LevelMaxPoints { get; set; }
    }

    public class UserDataRecentActivityDto
    {
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public int? PointsWon { get; set; }

        public string ImageUrl { get; set; }
        public string Title { get; internal set; }
        public string IconUrl { get; internal set; }
        public string Link { get; internal set; }
    }

    public class UserDataUserDto
    {
        public int Age { get; set; }
        public string AvatarUrl { get; set; }
        public string FullName { get; set; }
        public int DayPoints { get; set; }
    }
}
