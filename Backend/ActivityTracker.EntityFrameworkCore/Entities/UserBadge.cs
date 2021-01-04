using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ActivityTracker.EntityFrameworkCore.Entities
{
    public class UserBadge
    {
        public Guid UserBadgeID { get; set; }
        public Guid UserID { get; set; }
        public Guid BadgeID { get; set; }
        public DateTime Date { get; set; }

        public User User { get; set; }
        public Badge Badge { get; set; }
    }
}
