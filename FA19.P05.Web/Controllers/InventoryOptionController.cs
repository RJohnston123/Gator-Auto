using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FA19.P05.Web.Data;
using FA19.P05.Web.Features.Inventory;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FA19.P05.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController] // see: https://docs.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-3.0#apicontroller-attribute
    public class InventoryOptionController : ControllerBase
    {

        private readonly IMapper mapper;
        private readonly DataContext dataContext;
        public InventoryOptionController(IMapper mapper, DataContext dataContext)
        {
            this.mapper = mapper;
            this.dataContext = dataContext;
        }
        // GET: /<controller>/

        [HttpGet("")]
		[ProducesResponseType(typeof(InventoryOptionDto), 200)]
		[ProducesResponseType(typeof(ValidationProblemDetails), 404)]
		public async Task<ActionResult<IEnumerable<InventoryOptionDto>>> Get()
        {
            var queryable = dataContext.Set<InventoryOption>();
            var enumerated = await mapper.ProjectTo<InventoryOptionDto>(queryable).ToListAsync();

			if(queryable.Any())
				return Ok(enumerated);
			else
				return NotFound("Options could not be found.");
        }

        [HttpPost]
        [ProducesResponseType(typeof(InventoryOptionDto), 200)]
        [ProducesResponseType(typeof(ValidationProblemDetails), 400)]
        public async Task<ActionResult<InventoryOptionDto>> Post(InventoryOptionDto dto)
        {
            var inventoryOption = mapper.Map<InventoryOption>(dto);
            dataContext.Add(inventoryOption);
            await dataContext.SaveChangesAsync();
            return Ok(mapper.Map<InventoryOptionDto>(inventoryOption));
        }

    }
}
