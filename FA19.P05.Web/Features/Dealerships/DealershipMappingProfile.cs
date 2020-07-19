using AutoMapper;

namespace FA19.P05.Web.Features.Dealerships
{
    public class DealershipMappingProfile : Profile
    {
        public DealershipMappingProfile()
        {
            CreateMap<Dealership, DealershipDto>();
            CreateMap<CreateDealershipDto, Dealership>();
            CreateMap<UpdateDealershipDto, Dealership>();
        }
    }
}