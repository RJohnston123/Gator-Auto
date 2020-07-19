using System.Text.RegularExpressions;
using FluentValidation;

namespace FA19.P05.Web.Features.Shared
{
    public class AddressValidator : AbstractValidator<Address>
    {
        public static Regex ZipRegex = new Regex(@"^\d{5}$", RegexOptions.Compiled);

        public AddressValidator()
        {
            RuleFor(x => x.Line1)
                .NotEmpty()
                .MaximumLength(64);

            RuleFor(x => x.Line2)
                .MaximumLength(64);

            RuleFor(x => x.City)
                .MaximumLength(64);

            RuleFor(x => x.State)
                .Length(2); // If I was not lazy I'd make sure that the state is one of the valid 2 letter abbreviations 

            RuleFor(x => x.ZipCode)
                .Matches(ZipRegex)
                .WithMessage("Expected 5 digit zip");
        }
    }
}