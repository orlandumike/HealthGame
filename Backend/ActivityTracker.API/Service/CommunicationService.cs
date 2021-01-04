using ActivityTracker.EntityFrameworkCore;
using ActivityTracker.EntityFrameworkCore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace ActivityTracker.API.Service
{
    public class CommunicationService
    {

        public static bool GenerateNewCommunications(Guid userId)
        {
            var newComm = false;
            using (var dbContext = new ActivityTrackerDbContext())
            {
                var comms = dbContext.Communications.ToList();
                var userComms = dbContext.UserCommunications.Where(x => x.UserID == userId).ToList();
                
                foreach (var comm in comms)
                {
                    if (checkIfUserHasCommunication(userId, comm, userComms))
                    {
                        var userComm = new UserCommunication();
                        userComm.CommunicationID = comm.CommunicationID;
                        userComm.UserID = userId;
                        userComm.Date = DateTime.UtcNow;
                        dbContext.UserCommunications.Add(userComm);

                        newComm = true;
                    }
                }
                dbContext.SaveChanges();
            }

            return newComm;
        }

        private static bool checkIfUserHasCommunication(Guid userId, Communication comm, List<UserCommunication> userComms)
        {
            Type thisType = typeof(CommunicationService);
            MethodInfo theMethod = thisType.GetMethod(comm.RuleName, BindingFlags.Static | BindingFlags.NonPublic);
            if (theMethod != null)
            {
                return (bool)theMethod.Invoke(null, new object[] { userId, comm, userComms });
            }
            return false;
        }

        private static bool NoActivityFor3Days(Guid userId, Communication comm, List<UserCommunication> userComms )
        {
            using (var dbContext = new ActivityTrackerDbContext())
            {
                var userActivities = dbContext.UserActivities.Where(x => x.UserID == userId && x.Date > DateTime.UtcNow.AddDays(-3)).ToList();

                if (userActivities == null || userActivities.Count == 0)
                {
                    var alreadyNotified = userComms.FirstOrDefault(x => x.CommunicationID == comm.CommunicationID && x.Date > DateTime.UtcNow.AddDays(-14)) != null;
                    if (!alreadyNotified)
                    {
                        return true;
                    }
                }
            }

            return false;
                
        }

        private static bool First2000FootSteps(Guid userId, Communication comm, List<UserCommunication> userComms)
        {
            var hasBadge = HasBadge(userId, 2000);
            var hasComm = userComms.FirstOrDefault(x => x.CommunicationID == comm.CommunicationID) != null;

            if (hasBadge && !hasComm)
            {
                return true;
            }

            return false;
        }

        private static bool First8000FootStep(Guid userId, Communication comm, List<UserCommunication> userComms)
        {
            var hasBadge = HasBadge(userId, 8000);
            var hasComm = userComms.FirstOrDefault(x => x.CommunicationID == comm.CommunicationID) != null;

            if (hasBadge && !hasComm)
            {
                return true;
            }

            return false;
        }

        private static bool HasBadge(Guid userId, int Quantity)
        {
            using (var dbContext = new ActivityTrackerDbContext())
            {
                return dbContext.UserBadges.FirstOrDefault(x => x.UserID == userId && x.Badge.RuleName == "Walk" + Quantity) != null;
            }
        }
    }
}
