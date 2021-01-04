using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ActivityTracker.EntityFrameworkCore.Entities
{
    public class UserActivity
    {
        public Guid UserActivityID { get; set; }
        public DateTime Date { get; set; }
        public int Quantity { get; set; }
        public int HealthPoints { get; set; }
        public Guid UserID { get; set; }
        public int ActivityTypeID { get; set; }
        public string ExternalID { get; set; }

        public User User { get; set; }
        public ActivityType ActivityType { get; set; }
    }
}
