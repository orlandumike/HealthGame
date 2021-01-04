using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace ActivityTracker.Sample
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var dbContext = new ActivityTracker.EntityFrameworkCore.ActivityTrackerDbContext())
            {
                var badges = dbContext.Badges.ToList();
                var levels = dbContext.Levels.ToList();
                var users = dbContext.Users.Include(u => u.UserActivities).ThenInclude(ua => ua.ActivityType)
                                     .Include(u => u.UserBadges).ThenInclude(ub => ub.Badge)
                                     .Include(u => u.UserLevels).ThenInclude(ul => ul.Level)
                                     .Include(u => u.UserCommunications).ThenInclude(uc => uc.Communication)
                                     .ToList();
                
                Console.WriteLine(users.Count);
            }
        }
    }
}
