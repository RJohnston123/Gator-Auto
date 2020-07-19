using FluentValidation;

namespace FA19.P05.Web.Features.CreditScores
{
    public class CreditScoreDtoValidator : AbstractValidator<CreditScoreDto>
    {
        public CreditScoreDtoValidator()
        {
            RuleFor(x => x.CreditNumber)
                .InclusiveBetween(1, 850);

            RuleFor(x => x.UserId)
                .GreaterThan(0);
        }
    }
}