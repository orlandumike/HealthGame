using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ActivityTracker.API
{
    public static class Constants
    {
        // 0 .. 140, 80 objectif santé
        public const int MAX_HEALTH_POINTS_PER_DAY = 140; // At some point put it in a UserType profile to customize max HealthPoint by type of user
        public const int TARGET_HEALTH_POINTS_OBJECTIVE_PER_DAY = 80; // At some point put it in a UserType profile to customize max HealthPoint by type of user
    }
}
