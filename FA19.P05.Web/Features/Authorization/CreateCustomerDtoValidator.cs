using FluentValidation;

namespace FA19.P05.Web.Features.Authorization
{
    public class CreateCustomerDtoValidator : AbstractValidator<CreateCustomerDto>
    {
        public CreateCustomerDtoValidator(IValidator<ICreateUser> createUserValidator)
        {
            RuleFor(x => x)
                .SetValidator(createUserValidator);
        }
    }
}