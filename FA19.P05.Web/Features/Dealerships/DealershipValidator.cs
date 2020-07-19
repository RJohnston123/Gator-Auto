using System.Text.RegularExpressions;
using FA19.P05.Web.Features.Shared;
using FluentValidation;

namespace FA19.P05.Web.Features.Dealerships
{
    public class DealershipValidator : AbstractValidator<IDealership>
    {
        public static Regex PhoneRegex = new Regex(@"^\+1\d{10}$", RegexOptions.Compiled);

        public DealershipValidator(IValidator<Address> addressValidator)
        {
            RuleFor(x => x.SalesPhoneNumber)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .Matches(PhoneRegex)
                .WithMessage("Invalid phone, expected +1112223333");

            RuleFor(x => x.StoreName)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .MaximumLength(64);

            RuleFor(x => x.OpenHours)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .MaximumLength(64);

            RuleFor(x => x.Address)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .NotNull()
                .SetValidator(addressValidator);
        }
    }
}