namespace FA19.P05.Web.Features.Inventory
{
    public class InventoryOption
    {
        public int Id { get; set; }
        
        public string Make { get; set; }

        public string Model { get; set; }

        public int Year { get; set; }

        public string OptionDescription { get; set; }

        public decimal Price { get; set; }
    }
}
