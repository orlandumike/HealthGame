using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ActivityTracker.EntityFrameworkCore.Entities
{
    public class UserLevel
    {
        public Guid UserLevelID { get; set; }
        public Guid UserID { get; set; }
        public int LevelID { get; set; }
        public DateTime Date { get; set; }

        public User User { get; set; }
        public Level Level { get; set; }
    }
}
