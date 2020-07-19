using FluentValidation;

namespace FA19.P05.Web.Features.Inventory
{
    public class UpdateInventoryItemDtoValidator : AbstractValidator<UpdateInventoryItemDto>
    {
        public UpdateInventoryItemDtoValidator(IValidator<IInventoryItem> validator)
        {
            RuleFor(x => x)
                .SetValidator(validator);
        }
    }
}