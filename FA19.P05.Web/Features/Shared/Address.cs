using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace FA19.P05.Web.Features.Shared
{
    [Owned]
    public class Address
    {
        [MaxLength(64)]
        public string Line1 { get; set; }

        [MaxLength(64)]
        public string Line2 { get; set; }

        [MaxLength(64)]
        public string City { get; set; }

        [MaxLength(2)]
        public string State { get; set; }

        [MaxLength(5)]
        public string ZipCode { get; set; }
    }
}