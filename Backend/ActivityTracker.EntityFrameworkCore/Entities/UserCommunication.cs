using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ActivityTracker.EntityFrameworkCore.Entities
{
    public class UserCommunication
    {
        public Guid UserCommunicationID { get; set; }
        public Guid UserID { get; set; }
        public Guid CommunicationID { get; set; }
        public DateTime Date { get; set; }

        public User User { get; set; }
        public Communication Communication { get; set; }
    }
}
