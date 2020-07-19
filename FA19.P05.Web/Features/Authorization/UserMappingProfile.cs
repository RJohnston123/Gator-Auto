using AutoMapper;

namespace FA19.P05.Web.Features.Authorization
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
            CreateMap<CreateCustomerDto, User>();
            CreateMap<User, CustomerDto>();
            CreateMap<CreateUserDto, User>()
                .ForMember(x => x.Roles, o => o.Ignore()); // because we need to use the identity core user manager to add roles we manually do this
            CreateMap<User, UserDto>();
        }
    }
}