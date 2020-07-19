using System;

namespace FA19.P05.Web.Features.Inventory
{
    public class CreateInventoryItemDto : IInventoryItem
    {
        public string VIN { get; set; }

        public string Make { get; set; }

        public string Model { get; set; }

        public int Year { get; set; }

        public decimal BaseCost { get; set; }

		public string Image { get; set; }

        public DateTimeOffset AddedToStockUtc { get; set; }

        public int DealershipId { get; set; }
    }
}