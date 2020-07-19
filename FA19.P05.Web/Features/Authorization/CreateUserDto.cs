using System.Collections.Generic;

namespace FA19.P05.Web.Features.Authorization
{
    public class CreateUserDto : ICreateUser
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public List<int> Roles { get; set; } = new List<int>();
    }
}