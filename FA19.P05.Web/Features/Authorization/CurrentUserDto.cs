using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FA19.P05.Web.Features.Authorization
{
	public class CurrentUserDto
	{ 
		public string Username { get; set;}
		public string Name { get; set;}
		public string Email { get; set; }
		public IList<string> Roles { get; set; } = new List<string>();
	}
}
