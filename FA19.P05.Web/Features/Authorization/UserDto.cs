using System.Collections.Generic;

namespace FA19.P05.Web.Features.Authorization
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public List<RoleDto> Roles { get; set; } = new List<RoleDto>();
    }
}