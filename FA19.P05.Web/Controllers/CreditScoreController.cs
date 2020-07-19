using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FA19.P05.Web.Data;
using FA19.P05.Web.Features.Authorization;
using FA19.P05.Web.Features.CreditScores;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FA19.P05.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController] // see: https://docs.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-3.0#apicontroller-attribute
    public class CreditScoreController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly DataContext dataContext;

        public CreditScoreController(IMapper mapper, DataContext dataContext)
        {
            this.mapper = mapper;
            this.dataContext = dataContext;
        }

        [HttpPost]
        [ProducesResponseType(typeof(CreditScoreDto), 200)]
        [ProducesResponseType(typeof(ValidationProblemDetails), 404)]
        [ProducesResponseType(typeof(ValidationProblemDetails), 400)]
        public async Task<ActionResult<CreditScoreDto>> Post(CreditScoreDto dto)
        {
            var validCustomer = await dataContext.Set<User>().AnyAsync(x => x.Id == dto.UserId && x.Roles.Any(y=>y.Role.Name == UserRoles.Customer));
            if (!validCustomer)
            {
                ModelState.AddModelError(nameof(CreditScoreDto.UserId), "No such user or user not a customer");
                return NotFound(new ValidationProblemDetails(ModelState));
            }

            var existingRecord = await dataContext.Set<CreditScore>().FirstOrDefaultAsync(x => x.UserId == dto.UserId);

            // note: the '??' is the null coalescing operator: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/null-coalescing-operator#examples
            var targetRecord = existingRecord ?? dataContext.Add(new CreditScore()).Entity;
            mapper.Map(dto, targetRecord);

            await dataContext.SaveChangesAsync();

            return Ok(mapper.Map<CreditScoreDto>(targetRecord));
        }
    }
}