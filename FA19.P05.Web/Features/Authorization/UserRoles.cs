namespace FA19.P05.Web.Features.Authorization
{
    public static class UserRoles
    {
        public const string Admin = "Admin";
        public const string Customer = "Customer";
        public const string GM = "GM";
        public const string Sales = "Sales";

        public static string[] All => new[] {Admin, Customer, GM, Sales};
    }
}