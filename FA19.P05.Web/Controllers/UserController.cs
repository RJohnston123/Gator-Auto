using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FA19.P05.Web.Data;
using FA19.P05.Web.Features.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FA19.P05.Web.Controllers
{
    [EnableCors("AllowAllHeaders")]

    [Route("api/[controller]")]
    [ApiController] // see: https://docs.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-3.0#apicontroller-attribute
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly DataContext dataContext;
        private readonly IMapper mapper;

        public UserController(
            UserManager<User> userManager,
            DataContext dataContext,
            IMapper mapper)
        {
            this.userManager = userManager;
            this.dataContext = dataContext;
            this.mapper = mapper;
        }
        [EnableCors("AllowAllHeaders")]

        [HttpPost]
        [Authorize(Roles = UserRoles.Admin)]
        [ProducesResponseType(typeof(UserDto), 200)]
        [ProducesResponseType(typeof(ValidationProblemDetails), 400)]
        public async Task<ActionResult<UserDto>> Post(CreateUserDto dto)
        {
            // wrapping in a transaction means that if part of the transaction fails then everything saved is undone
            using (var transaction = await dataContext.Database.BeginTransactionAsync())
            {
                var roles = await dataContext.Set<Role>().Where(x => dto.Roles.Contains(x.Id)).ToArrayAsync();

                var entity = new User();
                mapper.Map(dto, entity);

                // this implicitly saves to the database without a datacontext.save changes. Because of the transaction above, the save isn't 'committed'
                var identityResult = await userManager.CreateAsync(entity, dto.Password);
                if (!identityResult.Succeeded)
                {
                    foreach (var identityResultError in identityResult.Errors)
                    {
                        ModelState.AddModelError(nameof(CreateUserDto.Password), identityResultError.Description);
                    }
                    return BadRequest(new ValidationProblemDetails(ModelState));
                }

                foreach (var role in roles)
                {
                    await userManager.AddToRoleAsync(entity, role.Name);
                }

                var result = new UserDto
                {
                    Id = entity.Id,
                    Email = entity.Email,
                    Roles = roles.Select(x => new RoleDto {Id = x.Id, Name = x.Name}).ToList()
                };
                transaction.Commit(); // the database values are now, for real, committed
                return result;
            }
        }
    }
}
