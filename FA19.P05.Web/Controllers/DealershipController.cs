using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FA19.P05.Web.Data;
using FA19.P05.Web.Features.Dealerships;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FA19.P05.Web.Controllers
{
    [EnableCors("AllowAllHeaders")]
    [Route("api/[controller]")]
    [ApiController] // see: https://docs.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-3.0#apicontroller-attribute
    public class DealershipController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly DataContext dataContext;

        public DealershipController(IMapper mapper, DataContext dataContext)
        {
            this.mapper = mapper;
            this.dataContext = dataContext;
        }
        [EnableCors("AllowAllHeaders")]

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(DealershipDto), 200)]
        [ProducesResponseType(typeof(StatusCodeResult), 404)]
        public async Task<ActionResult<DealershipDto>> Get(int id)
        {
            var queryable = dataContext.Set<Dealership>().Where(x=>x.Id == id).AsNoTracking();
            var item = await mapper.ProjectTo<DealershipDto>(queryable).FirstOrDefaultAsync();
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [EnableCors("AllowAllHeaders")]

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DealershipDto>>> Get()
        {
            var queryable = dataContext.Set<Dealership>().AsNoTracking();
            var enumerated = await mapper.ProjectTo<DealershipDto>(queryable).ToListAsync();
            return Ok(enumerated);
        }

        [EnableCors("AllowAllHeaders")]

        [HttpPut]
        [ProducesResponseType(typeof(DealershipDto), 200)]
        [ProducesResponseType(typeof(ValidationProblemDetails), 400)]
        [ProducesResponseType(typeof(ValidationProblemDetails), 404)]
        public async Task<ActionResult<DealershipDto>> Put(UpdateDealershipDto dto)
        {
            var dealership = await dataContext.Set<Dealership>().FirstOrDefaultAsync(x => x.Id == dto.Id);
            if (dealership == null)
            {
                ModelState.AddModelError(nameof(UpdateDealershipDto.Id), "No such dealership");
                return NotFound(new ValidationProblemDetails(ModelState));
            }

            mapper.Map(dto, dealership);
            await dataContext.SaveChangesAsync();

            return Ok(mapper.Map<DealershipDto>(dealership));
        }

        [EnableCors("AllowAllHeaders")]
        [HttpPost]
        public async Task<ActionResult<DealershipDto>> Post(CreateDealershipDto dto)
        {
            var dealership = mapper.Map<Dealership>(dto);
            dataContext.Add(dealership);
            await dataContext.SaveChangesAsync();
            return Ok(mapper.Map<DealershipDto>(dealership));
        }
    }
}
