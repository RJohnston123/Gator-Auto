using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FA19.P05.Web.Data;
using FA19.P05.Web.Features.Inventory;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FA19.P05.Web.Controllers
{
    [EnableCors("AllowAllHeaders")]

    [Route("api/[controller]")]
    [ApiController] // see: https://docs.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-3.0#apicontroller-attribute
    public class MakeListController : Controller
    {
        private readonly DataContext dataContext;

        public MakeListController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }
        [EnableCors("AllowAllHeaders")]

        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<MakeList>>> Get()
        {
            var queryable = dataContext.Set<MakeList>();
            var enumerated = await queryable.ToListAsync();
            return Ok(enumerated);
        }
        [EnableCors("AllowAllHeaders")]

        [HttpPost]
        [ProducesResponseType(typeof(InventoryOptionDto), 200)]
        [ProducesResponseType(typeof(ValidationProblemDetails), 400)]
        public async Task<ActionResult<MakeList>> Post(MakeList dto)
        {

            dataContext.Add(dto);
            await dataContext.SaveChangesAsync();
            return Ok(dto);
        }
    }
}
