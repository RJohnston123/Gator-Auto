using FA19.P05.Web.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace FA19.P05.Web.Features.Authorization
{
    public class CreateUserValidator : AbstractValidator<ICreateUser>
    {
        public CreateUserValidator(DataContext dataContext)
        {
            RuleFor(x => x.Email)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .EmailAddress()
                .MaximumLength(1000)
                .MustAsync(async (email, c) =>
                {
                    return !await dataContext.Set<User>().AnyAsync(x => x.Email.Equals(email));
                })
                .WithMessage("Duplicate email address");

            RuleFor(x => x.Username)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .MaximumLength(256)
                .MustAsync(async (username, c) =>
                {
                    return !await dataContext.Set<User>().AnyAsync(x => x.UserName.Equals(username));
                })
                .WithMessage("Duplicate username");

            RuleFor(x => x.Name)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .MaximumLength(200);

            RuleFor(x => x.Password)
                .NotEmpty();
        }
    }
}