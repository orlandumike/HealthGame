using ActivityTracker.EntityFrameworkCore.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ActivityTracker.EntityFrameworkCore.EntityTypeConfiguration
{
    public class CommunicationEntityTypeConfiguration : IEntityTypeConfiguration<Communication>
    {
        public void Configure(EntityTypeBuilder<Communication> builder)
        {
            builder.ToTable("Communication");
        }
    }
}
