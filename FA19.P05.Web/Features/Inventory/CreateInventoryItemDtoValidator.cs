using FluentValidation;

namespace FA19.P05.Web.Features.Inventory
{
    public class CreateInventoryItemDtoValidator : AbstractValidator<CreateInventoryItemDto>
    {
        public CreateInventoryItemDtoValidator(IValidator<IInventoryItem> validator)
        {
            RuleFor(x => x)
                .SetValidator(validator);
        }
    }
}