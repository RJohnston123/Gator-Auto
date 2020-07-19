using FluentValidation;

namespace FA19.P05.Web.Features.Dealerships
{
    public class CreateDealershipDtoValidator : AbstractValidator<CreateDealershipDto>
    {
        public CreateDealershipDtoValidator(IValidator<IDealership> dealershipValidator)
        {
            RuleFor(x => x)
                .SetValidator(dealershipValidator);
        }
    }
}