using ActivityTracker.EntityFrameworkCore.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ActivityTracker.EntityFrameworkCore
{
    public class ActivityTrackerDbContext: DbContext
    {
        public ActivityTrackerDbContext()
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=tcp:TODO.database.windows.net,1433;Initial Catalog=hack-activity-trackerTODO;Persist Security Info=False;User ID=hackaton;Password=TODO;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ActivityTrackerDbContext).Assembly);
        }

        public DbSet<Badge> Badges { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserActivity> UserActivities { get; set; }
        public DbSet<ActivityType> ActivityTypes { get; set; }
        public DbSet<Level> Levels { get; set; }
        public DbSet<UserBadge> UserBadges { get; set; }
        public DbSet<UserLevel> UserLevels { get; set; }
        public DbSet<UserCommunication> UserCommunications { get; set; }
        public DbSet<Communication> Communications { get; set; }
        public DbSet<ActivityTypeStep> ActivityTypeSteps { get; set; }
    }
}
