using System;
using FA19.P05.Web.Data;
using FA19.P05.Web.Features.Dealerships;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace FA19.P05.Web.Features.Inventory
{
    public class InventoryItemValidator : AbstractValidator<IInventoryItem>
    {
        public InventoryItemValidator(DataContext dataContext)
        {
            RuleFor(x => x.DealershipId)
                .MustAsync((dealershipId, c) => dataContext.Set<Dealership>().AnyAsync(x => x.Id == dealershipId))
                .WithMessage("No such dealership");

            RuleFor(x => x.AddedToStockUtc)
                .InclusiveBetween(DateTimeOffset.UnixEpoch, DateTimeOffset.UtcNow);

            RuleFor(x => x.Make)
                .NotEmpty()
                .MaximumLength(20);

            RuleFor(x => x.Model)
                .NotEmpty()
                .MaximumLength(30);

            RuleFor(x => x.Year)
                .InclusiveBetween(1900, 9999);

            RuleFor(x => x.BaseCost)
                .InclusiveBetween(1, 999999);
        }
    }
}