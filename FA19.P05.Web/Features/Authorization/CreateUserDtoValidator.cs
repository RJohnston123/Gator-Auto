using FA19.P05.Web.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace FA19.P05.Web.Features.Authorization
{
    public class CreateUserDtoValidator : AbstractValidator<CreateUserDto>
    {
        public CreateUserDtoValidator(IValidator<ICreateUser> validator, DataContext dataContext)
        {
            RuleFor(x => x)
                .SetValidator(validator);

            RuleFor(x => x.Roles)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .NotNull()
                .NotEmpty()
                .MustAsync(async (roles, c) =>
                {
                    return !await dataContext.Set<Role>().AnyAsync(x => x.Name == UserRoles.Customer && roles.Contains(x.Id));
                })
                .WithMessage("Cannot specify 'Customer' role");
        }
    }
}