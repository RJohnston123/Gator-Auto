namespace FA19.P05.Web.Features.Authorization
{
    public interface ICreateUser
    {
        string Username { get; set; }
        string Password { get; set; }
        string Email { get; set; }
        string Name { get; set; }
    }
}