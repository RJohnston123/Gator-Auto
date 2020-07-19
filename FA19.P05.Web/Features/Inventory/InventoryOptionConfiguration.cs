using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FA19.P05.Web.Features.Inventory
{
    public class InventoryOptionConfiguration : IEntityTypeConfiguration<InventoryOption>
    {
        public void Configure(EntityTypeBuilder<InventoryOption> builder)
        {
            builder.Property(x => x.Make)
                .HasMaxLength(20)
                .IsRequired();

            builder.Property(x => x.Model)
                .HasMaxLength(30)
                .IsRequired();

            builder.Property(x => x.Year)
                .IsRequired();

            builder.Property(x => x.OptionDescription)
                .HasMaxLength(1000)
                .IsRequired();

            builder.Property(x => x.Price)
                .IsRequired();


			//Seeded Data
			builder.HasData(
			new InventoryOption
			{
				Id = 1,
				Year = 2006,
				Make = "NISSAN",
				Model = "Sentra",
				Price = 4000,
				OptionDescription = "-Includes Floor Mats \n-Heated Seats"
			},
			new InventoryOption
			{
				Id = 2,
				Year = 2006,
				Make = "NISSAN",
				Model = "Sentra",
				Price = 4100,
				OptionDescription = "-Includes Floor Mats \n-Heated Seats \n-Bluetooth Radio"
			},
			new InventoryOption
			{
				Id = 3,
				Year = 2012,
				Make = "FORD",
				Model = "F150",
				Price = 35000,
				OptionDescription = "-Includes Floor Mats \n-Heated Seats \n-Bluetooth Radio"
			});
        }
    }
}