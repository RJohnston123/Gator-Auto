using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FA19.P05.Web.Data;
using FA19.P05.Web.Features.Authorization;
using FA19.P05.Web.Features.Inventory;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FA19.P05.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritesController : ControllerBase
    {
		private readonly DataContext dataContext;

		public FavoritesController(DataContext dataContext)
		{
			this.dataContext = dataContext;
		}

		[HttpGet("{userName}")]
		[ProducesResponseType(typeof(InventoryItem), 200)]
		[ProducesResponseType(typeof(StatusCodeResult), 404)]
		public async Task<ActionResult<InventoryItem>> Get(string userName)
		{
			var queryable = dataContext.Set<UserFavorites>().Where(x => x.UserName == userName);
			var favIds = queryable.Select(s => s.InventoryId);
			var vehicles = dataContext.Set<InventoryItem>().Where(x => favIds.Contains(x.Id));

			if (queryable.Any())
				return Ok(vehicles);
			else
				return NotFound("Could not find favorites under this username.");
		}

		[HttpGet("{userName}/{id}")]
		[ProducesResponseType(typeof(InventoryItem), 200)]
		[ProducesResponseType(typeof(StatusCodeResult), 404)]
		public async Task<ActionResult<InventoryItem>> GetOne(string userName, int id)
		{
			var queryable = dataContext.Set<UserFavorites>().Where(x => x.UserName == userName && x.InventoryId == id);
			var favIds = queryable.Select(s => s.InventoryId);
			var vehicles = dataContext.Set<InventoryItem>().Where(x => favIds.Contains(x.Id));

			if (queryable.Any())
				return Ok(vehicles);
			else
				return NotFound("Could not find favorited vehicle for this user.");

		}

		[HttpPost]
		public async Task<ActionResult<UserFavorites>> Post(UserFavorites fav)
		{
			var queryable = dataContext.Set<InventoryItem>().Where(x => x.Id == fav.InventoryId);

			if (queryable.Any())
			{
				dataContext.Add(fav);
				await dataContext.SaveChangesAsync();
				return Ok(fav);
			}
			else
			{
				return NotFound("The inventory item you tried favoriting does not exist.");
			}
			
		}

		[HttpDelete]
		public async Task<ActionResult<UserFavorites>> Delete(string userName, int inventoryId)
		{
			var favorite = dataContext.Set<UserFavorites>().FirstOrDefault(x => x.UserName == userName && x.InventoryId == inventoryId);
			if (favorite == null)
			{
				return NotFound();
			}

			dataContext.Set<UserFavorites>().Remove(favorite);
			dataContext.SaveChanges();

			return Ok(favorite);
		}
	}
}