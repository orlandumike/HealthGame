using ActivityTracker.EntityFrameworkCore.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ActivityTracker.EntityFrameworkCore.EntityTypeConfiguration
{
    public class ActivityTypeStepEntityTypeConfiguration : IEntityTypeConfiguration<ActivityTypeStep>
    {
        public void Configure(EntityTypeBuilder<ActivityTypeStep> builder)
        {
            builder.ToTable("ActivityTypeStep");
        }
    }
}
