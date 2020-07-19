namespace FA19.P05.Web.Features.Authorization
{
    public class CreateCustomerDto : ICreateUser
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
    }
}