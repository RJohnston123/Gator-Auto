using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FA19.P05.Web.Features.Authorization
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.Property(x => x.Email)
                .HasMaxLength(1000)
                .IsRequired();
            
            builder.Property(x => x.Name)
                .HasMaxLength(200);

            builder.HasIndex(x => x.Email)
                .IsUnique();
        }
    }
}