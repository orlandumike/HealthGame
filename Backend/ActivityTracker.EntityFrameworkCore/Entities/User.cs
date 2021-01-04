using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ActivityTracker.EntityFrameworkCore.Entities
{
    public class User
    {
        public Guid UserID { get; set; }
        public int UTN { get; set; }
        public int HealthPoints { get; set; }
        public string Name { get; set; }
        public DateTime? Birthdate { get; set; }
        public string AvatarUrl { get; set; }
        public DateTime SubscriptionDate { get; set; }
        public string ExternalID {get;set;}


        public IEnumerable<UserActivity> UserActivities { get; set; }
        public IEnumerable<UserBadge> UserBadges { get; set; }
        public IEnumerable<UserLevel> UserLevels { get; set; }
        public IEnumerable<UserCommunication> UserCommunications { get; set; }
    }
}
