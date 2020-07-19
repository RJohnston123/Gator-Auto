using AutoMapper;

namespace FA19.P05.Web.Features.Inventory
{
    public class InventoryItemMappingProfile : Profile
    {
        public InventoryItemMappingProfile()
        {
            CreateMap<InventoryItem, InventoryItemDto>();
            CreateMap<CreateInventoryItemDto, InventoryItem>();
            CreateMap<UpdateInventoryItemDto, InventoryItem>();
        }
    }
}