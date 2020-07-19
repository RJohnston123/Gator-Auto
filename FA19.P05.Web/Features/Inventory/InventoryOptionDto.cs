using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FA19.P05.Web.Features.Inventory
{
    public class InventoryOptionDto
    {
        public string Make { get; set; }

        public string Model { get; set; }

        public int Year { get; set; }

        public string OptionDescription { get; set; }

        public decimal Price { get; set; }
    }
}
