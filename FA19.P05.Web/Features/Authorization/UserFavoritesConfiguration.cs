using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FA19.P05.Web.Features.Authorization
{
	public class UserFavoritesConfiguration: IEntityTypeConfiguration<UserFavorites>
	{
		public void Configure(EntityTypeBuilder<UserFavorites> builder)
		{
			builder.Property(x => x.UserName)
				.IsRequired();

			builder.Property(x => x.InventoryId)
				.IsRequired();

			builder.HasIndex(x => new { x.UserName, x.InventoryId })
			.IsUnique();
		}
	}
}
