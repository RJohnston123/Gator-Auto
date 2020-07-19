using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FA19.P05.Web.Data;
using FA19.P05.Web.Features.Inventory;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FA19.P05.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeaturedController : ControllerBase
    {
		private readonly IMapper mapper;
		private readonly DataContext dataContext;

		public FeaturedController(IMapper mapper, DataContext dataContext)
		{
			this.mapper = mapper;
			this.dataContext = dataContext;
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<InventoryItemDto>>> Get()
		{
			var queryable = dataContext.Set<InventoryItem>().Take(4);
			var enumerated = await mapper.ProjectTo<InventoryItemDto>(queryable).ToListAsync();
			return Ok(enumerated);
		}

	}
}
