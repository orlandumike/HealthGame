﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ActivityTracker.EntityFrameworkCore.Entities
{
    public class Badge
    {
        public Guid BadgeID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public string RuleName { get; set; }
    }
}
