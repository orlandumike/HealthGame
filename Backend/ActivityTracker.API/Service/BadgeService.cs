using ActivityTracker.EntityFrameworkCore;
using ActivityTracker.EntityFrameworkCore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace ActivityTracker.API.Service
{
    public static class BadgeService
    {

        public static void GeneraterNewBadges(Guid userId)
        {
            using (var dbContext = new ActivityTrackerDbContext())
            {
                var badges = dbContext.Badges.ToList();
                var userBadges = dbContext.UserBadges.Where(x => x.UserID == userId).ToList();

                foreach (var badge in badges)
                {
                    if (userBadges.FirstOrDefault(x => x.BadgeID == badge.BadgeID) == null)
                    {
                        if (CheckIfUserWonThisBadge(userId, badge))
                        {
                            var userBadge = new UserBadge();
                            userBadge.UserID = userId;
                            userBadge.BadgeID = badge.BadgeID;
                            userBadge.Date = DateTime.UtcNow;

                            dbContext.UserBadges.Add(userBadge);
                        }
                    }
                }
                dbContext.SaveChanges();
            }
        }

        private static bool CheckIfUserWonThisBadge(Guid userId, Badge badge)
        { 
            Type thisType = typeof(BadgeService);
            MethodInfo theMethod = thisType.GetMethod(badge.RuleName, BindingFlags.Static | BindingFlags.NonPublic);
            if (theMethod != null)
            {
                return (bool)theMethod.Invoke(null, new object[] { userId, badge });
            }
            return false;
        }

        private static bool NewJoiner(Guid userId, Badge badge)
        {
            using (var dbContext = new ActivityTrackerDbContext())
            {
                return dbContext.UserBadges.FirstOrDefault(x => x.UserID == userId && x.Badge.Name == badge.Name) == null;
            }
        }

        private static bool Walk2000(Guid userId, Badge badge)
        {
            return WalkCount(userId, badge, 2000);  
        }

        private static bool Walk4000(Guid userId, Badge badge)
        {
            return WalkCount(userId, badge, 4000);
        }

        private static bool Walk6000(Guid userId, Badge badge)
        {
            return WalkCount(userId, badge, 6000);
        }

        private static bool Walk8000(Guid userId, Badge badge)
        {
            return WalkCount(userId, badge, 8000);
        }

        private static bool WalkCount(Guid userId, Badge badge, int nbFootSteps)
        {
            using (var dbContext = new ActivityTrackerDbContext())
            {
                var maxFootStepsPerDay = dbContext.UserActivities.Where(x => x.UserID == userId && x.ActivityTypeID == 1).GroupBy(x => x.Date.DayOfYear).Select(x => new { x.Key, FootSteps = x.Sum(y => y.Quantity) }).ToList();
                return maxFootStepsPerDay.FirstOrDefault(x => x.FootSteps >= nbFootSteps) != null;
            } 
        }
    }
}
