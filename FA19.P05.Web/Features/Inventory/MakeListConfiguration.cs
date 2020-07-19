using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FA19.P05.Web.Features.Inventory
{
    public class MakeListConfiguration : IEntityTypeConfiguration<MakeList>
    {
        public void Configure(EntityTypeBuilder<MakeList> builder)
        {
            builder.HasIndex(x => x.Make)
            .IsUnique();


			//Seeded Data
			builder.HasData(
			new MakeList
			{
				Id = 1,
				Make = "NISSAN"
			},
			new MakeList
			{
				Id = 2,
				Make = "FORD"
			},
			new MakeList
			{
				Id = 3,
				Make = "TOYOTA"
			});
        }
    }
}
