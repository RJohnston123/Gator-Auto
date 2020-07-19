using System.Threading.Tasks;
using AutoMapper;
using FA19.P05.Web.Data;
using FA19.P05.Web.Features.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace FA19.P05.Web.Controllers
{
    [EnableCors("AllowAllHeaders")]

    [Route("api/[controller]")]
    [ApiController] // see: https://docs.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-3.0#apicontroller-attribute
    public class CustomerController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly DataContext dataContext;
        private readonly UserManager<User> userManager;

        public CustomerController(IMapper mapper, DataContext dataContext, UserManager<User> userManager)
        {
            this.mapper = mapper;
            this.dataContext = dataContext;
            this.userManager = userManager;
        }
        [EnableCors("AllowAllHeaders")]

        [HttpPost]
        [ProducesResponseType(typeof(CustomerDto), 200)]
        [ProducesResponseType(typeof(ValidationProblemDetails), 400)]
        public async Task<ActionResult<CustomerDto>> Post(CreateCustomerDto dto)
        {
            // wrapping in a transaction means that if part of the transaction fails then everything saved is undone
            using (var transaction = await dataContext.Database.BeginTransactionAsync())
            {
                var entity = new User();
                mapper.Map(dto, entity);

                // this implicitly saves to the database without a datacontext.save changes. Because of the transaction above, the save isn't 'committed'
                var identityResult = await userManager.CreateAsync(entity, dto.Password);
                if (!identityResult.Succeeded)
                {
                    foreach (var identityResultError in identityResult.Errors)
                    {
                        ModelState.AddModelError(nameof(CreateCustomerDto.Password), identityResultError.Description);
                    }
                    return BadRequest(new ValidationProblemDetails(ModelState));
                }

                // same as the create
                await userManager.AddToRoleAsync(entity, UserRoles.Customer);

                transaction.Commit(); // the database values are now, for real, committed
                return mapper.Map<CustomerDto>(entity);
            }
        }
    }
}