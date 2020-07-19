using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FA19.P05.Web.Features.Inventory
{
    public class InventoryOptionsMappingProfile : Profile
    {
        public InventoryOptionsMappingProfile()
        {
            CreateMap<InventoryOption, InventoryOptionDto>();
            CreateMap<InventoryOptionDto, InventoryOption>();

        }
    }
}
