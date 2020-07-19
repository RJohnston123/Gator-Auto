using FA19.P05.Web.Features.Shared;

namespace FA19.P05.Web.Features.Dealerships
{
    public interface IDealership
    {
        Address Address { get; set; }

        string SalesPhoneNumber { get; set; }

        string StoreName { get; set; }

        string OpenHours { get; set; }
    }
}