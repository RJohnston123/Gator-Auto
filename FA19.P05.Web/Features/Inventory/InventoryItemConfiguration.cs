using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace FA19.P05.Web.Features.Inventory
{
    public class InventoryItemConfiguration : IEntityTypeConfiguration<InventoryItem>
    {
        public void Configure(EntityTypeBuilder<InventoryItem> builder)
        {
            builder.Property(x => x.VIN)
                .HasMaxLength(24)
                .IsRequired();

            builder.Property(x => x.Make)
                .HasMaxLength(20)
                .IsRequired();

            builder.Property(x => x.Model)
                .HasMaxLength(30)
                .IsRequired();

            builder.Property(x => x.Year)
                .IsRequired();

            builder.Property(x => x.BaseCost)
                .IsRequired();


			//Seeded Data
			builder.HasData(
			new InventoryItem
			{
				Id = 1,
				VIN = "3N1CB51D96L487364",
				Make = "NISSAN",
				Model = "Sentra",
				Year = 2006,
				BaseCost = 3000,
				Image = "https://i.imgur.com/xJYcO50.png",
				DealershipId = 1,
				AddedToStockUtc = DateTime.UtcNow
			},
			new InventoryItem
			{
				Id = 2,
				VIN = "3FAHP0JA3CR394884",
				Make = "FORD",
				Model = "Fusion",
				Year = 2012,
				BaseCost = 20000,
				Image = "https://i.imgur.com/rD8ShNd.png",
				DealershipId = 1,
				AddedToStockUtc = DateTime.UtcNow
			},
			new InventoryItem
			{
				Id = 3,
				VIN = "1FTFW1CT6CFB64889",
				Make = "FORD",
				Model = "F150",
				Year = 2012,
				BaseCost = 30000,
				Image = "https://i.imgur.com/oLsO8Bw.png",
				DealershipId = 2,
				AddedToStockUtc = DateTime.UtcNow
			},
			new InventoryItem
			{
				Id = 4,
				VIN = "JTDKARFP9J3071163",
				Make = "TOYOTA",
				Model = "Prius Prime",
				Year = 2018,
				BaseCost = 35000,
				Image = "https://i.imgur.com/gzpjD4f.png",
				DealershipId = 2,
				AddedToStockUtc = DateTime.UtcNow
			},
			new InventoryItem
			{
				Id = 5,
				VIN = "5YFBURHE5FP260426",
				Make = "TOYOTA",
				Model = "Corolla",
				Year = 2015,
				BaseCost = 20000,
				Image = "https://i.imgur.com/5CDUcon.png",
				DealershipId = 1,
				AddedToStockUtc = DateTime.UtcNow
			});
        }
    }
}