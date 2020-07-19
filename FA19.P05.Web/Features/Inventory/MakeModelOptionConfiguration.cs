using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FA19.P05.Web.Features.Inventory
{
    public class MakeModelOptionConfiguration : IEntityTypeConfiguration<MakeModelOption>
    {
        public void Configure(EntityTypeBuilder<MakeModelOption> builder)
        {
			builder.HasIndex(x => new {x.Make, x.Model})
			.IsUnique();

			builder.HasData(
			new MakeModelOption
			{
				Id = 1,
				Make = "NISSAN",
				Model = "Sentra"
			},
			new MakeModelOption
			{
				Id = 2,
				Make = "FORD",
				Model = "Fusion"
			},
			new MakeModelOption
			{
				Id = 3,
				Make = "FORD",
				Model = "F150"
			},
			new MakeModelOption
			{
				Id = 4,
				Make = "TOYOTA",
				Model = "Prius Prime"
			},
			new MakeModelOption
			{
				Id = 5,
				Make = "TOYOTA",
				Model = "Corolla"
			});
		}
    }
}
