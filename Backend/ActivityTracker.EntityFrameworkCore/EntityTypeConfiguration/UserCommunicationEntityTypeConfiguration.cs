using ActivityTracker.EntityFrameworkCore.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ActivityTracker.EntityFrameworkCore.EntityTypeConfiguration
{
    public class UserCommunicationEntityTypeConfiguration : IEntityTypeConfiguration<UserCommunication>
    {
        public void Configure(EntityTypeBuilder<UserCommunication> builder)
        {
            builder.ToTable("UserCommunication");
        }
    }
}
