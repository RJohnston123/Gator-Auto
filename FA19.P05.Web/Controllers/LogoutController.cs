using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FA19.P05.Web.Features.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace FA19.P05.Web.Controllers
{
    [EnableCors("AllowAllHeaders")]

    [Route("api/[controller]")]
    [ApiController]
    public class LogoutController : ControllerBase
    {
		private readonly SignInManager<User> signInManager;

		public LogoutController(SignInManager<User> signInManager)
		{
			this.signInManager = signInManager;
		}

        [EnableCors("AllowAllHeaders")]

        // POST: api/Logout
        [HttpPost]
        public async Task<IActionResult> Logout()
        {
			await signInManager.SignOutAsync();
			return Ok("Logout Successful");
        }
    }
}
