using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FA19.P05.Web.Data;
using FA19.P05.Web.Features.Inventory;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FA19.P05.Web.Controllers
{

    [Route("api/[controller]")]
    [ApiController] // see: https://docs.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-3.0#apicontroller-attribute
    public class InventoryItemController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly DataContext dataContext;

        public InventoryItemController(IMapper mapper, DataContext dataContext)
        {
            this.mapper = mapper;
            this.dataContext = dataContext;
        }


        [HttpGet("{id}")]
        [ProducesResponseType(typeof(InventoryItemDto), 200)]
        [ProducesResponseType(typeof(StatusCodeResult), 404)]
        public async Task<ActionResult<InventoryItemDto>> Get(int id)
        {
            var queryable = dataContext.Set<InventoryItem>().Where(x => x.Id == id);
            var item = await mapper.ProjectTo<InventoryItemDto>(queryable).FirstOrDefaultAsync();
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }


        [HttpGet("search")]
        [ProducesResponseType(typeof(InventoryItemDto), 200)]
        [ProducesResponseType(typeof(StatusCodeResult), 404)]
        public async Task<ActionResult<InventoryItemDto>> Get(string VIN, int minYear, int maxYear, int min, int max)
        {
            IQueryable queryable;

            if (VIN.Equals("0"))
            {
                 queryable = dataContext.Set<InventoryItem>().Where(x => x.Year >= minYear && x.Year <= maxYear && x.BaseCost >= min && x.BaseCost <= max);
            }
            else
            {
                 queryable = dataContext.Set<InventoryItem>().Where(x => x.VIN == VIN && x.Year >= minYear && x.Year <= maxYear && x.BaseCost >= min && x.BaseCost <= max);
            }
            var item = await mapper.ProjectTo<InventoryItemDto>(queryable).ToListAsync();
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpGet("adminSearch")]
        [ProducesResponseType(typeof(InventoryItemDto), 200)]
        [ProducesResponseType(typeof(StatusCodeResult), 404)]
        public async Task<ActionResult<InventoryItemDto>> Get(string VIN, int year, int dealershipId, string make, string model)
        {
            IQueryable queryable;

            if (!VIN.Equals("0") && year == 1337 && make == null && dealershipId != 0)
            {
                queryable = dataContext.Set<InventoryItem>().Where(x => x.DealershipId == dealershipId);
            }
            else if(!VIN.Equals("0") && year == 1337 && dealershipId != 0)
            {
                queryable = dataContext.Set<InventoryItem>().Where(x => x.DealershipId == dealershipId && x.Model == model && x.Make == make);
            }
            else if (!VIN.Equals("0") && dealershipId != 0)
            {
                queryable = dataContext.Set<InventoryItem>().Where(x => x.Year == year && x.DealershipId == dealershipId && x.Model == model && x.Make == make);
            }
            else if (!VIN.Equals("0") && year == 1337 && make == null)
            {
                queryable = dataContext.Set<InventoryItem>();
            }
            else if (!VIN.Equals("0") && year == 1337)
            {
                queryable = dataContext.Set<InventoryItem>().Where(x => x.Model == model && x.Make == make);
            }
            else if (!VIN.Equals("0"))
            {
                queryable = dataContext.Set<InventoryItem>().Where(x => x.Year == year && x.Model == model && x.Make == make);
            }
            else if (VIN.Equals("0") && year == 1337 && make == null && dealershipId != 0)
            {
                queryable = dataContext.Set<InventoryItem>().Where(x => x.DealershipId == dealershipId);
            }
            else if (VIN.Equals("0") && year == 1337 && dealershipId != 0)
            {
                queryable = dataContext.Set<InventoryItem>().Where(x => x.DealershipId == dealershipId && x.Model == model && x.Make == make);
            }
            else if (VIN.Equals("0") && dealershipId != 0)
            {
                queryable = dataContext.Set<InventoryItem>().Where(x => x.Year == year && x.DealershipId == dealershipId && x.Model == model && x.Make == make);
            }
            else if (VIN.Equals("0") && year == 1337 && make == null)
            {
                queryable = dataContext.Set<InventoryItem>();
            }
            else if (VIN.Equals("0") && year == 1337)
            {
                queryable = dataContext.Set<InventoryItem>().Where(x => x.Model == model && x.Make == make);
            }
            else if (VIN.Equals("0"))
            {
                queryable = dataContext.Set<InventoryItem>().Where(x => x.Year == year && x.Model == model && x.Make == make);
            }
            else
            {
                queryable = dataContext.Set<InventoryItem>();
            }

            var item = await mapper.ProjectTo<InventoryItemDto>(queryable).ToListAsync();
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }
        [EnableCors("AllowAllHeaders")]

        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<InventoryItemDto>>> Get()
        {
            var queryable = dataContext.Set<InventoryItem>();
            var enumerated = await mapper.ProjectTo<InventoryItemDto>(queryable).ToListAsync();
            return Ok(enumerated);
        }

		[HttpGet("VIN")]
		[ProducesResponseType(typeof(InventoryItemDto), 200)]
		[ProducesResponseType(typeof(StatusCodeResult), 404)]
		public async Task<ActionResult<IEnumerable<InventoryItemDto>>> GetVIN(string VIN)
		{
			var queryable = dataContext.Set<InventoryItem>().Where(x => x.VIN == VIN);
			var enumerated = mapper.ProjectTo<InventoryItemDto>(queryable).FirstOrDefault();

			if(queryable.Any())
				return Ok(enumerated);
			else
				return NotFound("Vehicle can't be found.");
		}


		[HttpPut]
        [ProducesResponseType(typeof(InventoryItemDto), 200)]
        [ProducesResponseType(typeof(ValidationProblemDetails), 400)]
        [ProducesResponseType(typeof(ValidationProblemDetails), 404)]
        public async Task<ActionResult<InventoryItemDto>> Put(UpdateInventoryItemDto dto)
        {
            var inventoryItem = await dataContext.Set<InventoryItem>().FirstOrDefaultAsync(x => x.Id == dto.Id);
            if (inventoryItem == null)
            {
                ModelState.AddModelError(nameof(UpdateInventoryItemDto.Id), "No such inventory item");
                return NotFound(new ValidationProblemDetails(ModelState));
            }

            mapper.Map(dto, inventoryItem);
            await dataContext.SaveChangesAsync();

            return Ok(mapper.Map<InventoryItemDto>(inventoryItem));
        }

        [HttpPost]
        [ProducesResponseType(typeof(InventoryItemDto), 200)]
        [ProducesResponseType(typeof(ValidationProblemDetails), 400)]
        public async Task<ActionResult<InventoryItemDto>> Post(CreateInventoryItemDto dto)
        {
            var inventoryItem = mapper.Map<InventoryItem>(dto);
            dataContext.Add(inventoryItem);
            await dataContext.SaveChangesAsync();
            return Ok(mapper.Map<InventoryItemDto>(inventoryItem));
        }

		[HttpDelete]
		public async Task<ActionResult<InventoryItem>> Delete(int id)
		{
			var inventoryItem = await dataContext.Set<InventoryItem>().FindAsync(id);
			if (inventoryItem == null)
			{
				return NotFound();
			}

			dataContext.Set<InventoryItem>().Remove(inventoryItem);
			dataContext.SaveChanges();

			return Ok(inventoryItem);
		}
	}
}
