using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace FA19.P05.Web.Features.Authorization
{
    public class Role : IdentityRole<int>
    {
        public virtual ICollection<UserRole> Users { get; set; } = new List<UserRole>();
    }
}