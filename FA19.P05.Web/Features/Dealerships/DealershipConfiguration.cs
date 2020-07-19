using FA19.P05.Web.Features.Shared;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FA19.P05.Web.Features.Dealerships
{
    public class DealershipConfiguration : IEntityTypeConfiguration<Dealership>
    {
        public void Configure(EntityTypeBuilder<Dealership> builder)
        {
            builder.Property(x => x.SalesPhoneNumber)
                .HasMaxLength(12)
                .IsRequired();

            builder.OwnsOne(x => x.Address).HasData(
			new
			{
				DealershipId = 1,
				Line1 = "101 Gator Dr.",
				Line2 = "",
				City = "Hammond",
				State = "LA",
				ZipCode = "70403"
			},
			new {
				DealershipId = 2,
				Line1 = "101 Gator Dr.",
				Line2 = "",
				City = "Slidell",
				State = "LA",
				ZipCode = "70458"
			});

            builder.Property(x => x.StoreName)
                .HasMaxLength(64)
                .IsRequired();

            builder.Property(x => x.OpenHours)
                .HasMaxLength(64)
                .IsRequired();

			
			//Seeded Data
			builder.HasData(
				new Dealership {Id = 1,
								SalesPhoneNumber = "+19857431545",
								StoreName = "Gator Auto",
								OpenHours = "9-5"},
				new Dealership {Id = 2,
								SalesPhoneNumber = "+19857283746",
								StoreName = "Gator Auto",
								OpenHours = "9-5"});
        }
    }
}