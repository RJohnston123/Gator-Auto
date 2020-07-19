using FluentValidation;

namespace FA19.P05.Web.Features.Dealerships
{
    public class UpdateDealershipDtoValidator : AbstractValidator<UpdateDealershipDto>
    {
        public UpdateDealershipDtoValidator(IValidator<IDealership> dealershipValidator)
        {
            RuleFor(x => x)
                .SetValidator(dealershipValidator);
        }
    }
}