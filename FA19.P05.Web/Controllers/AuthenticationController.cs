using System.Collections;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using FA19.P05.Web.Features.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace FA19.P05.Web.Controllers
{

    [Route("api/[controller]")]
    [ApiController] // see: https://docs.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-3.0#apicontroller-attribute
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        public AuthenticationController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpPost]
        [ProducesResponseType(typeof(SignInResult), 200)]
        [ProducesResponseType(typeof(SignInResult), 400)]
        public async Task<ActionResult<CurrentUserDto>> Login(LoginDto dto)
        {
            var user = await userManager.FindByNameAsync(dto.Username);
            if (user == null)
            {
                return BadRequest(new SignInResult());
            }
            var result = await signInManager.CheckPasswordSignInAsync(user, dto.Password, true);
            if (!result.Succeeded)
            {
                return BadRequest(result);
            }
            await signInManager.SignInAsync(user, false, "Password");

			var roles = await userManager.GetRolesAsync(user);

			var currentUserDTO = new CurrentUserDto
			{
				Name = user.Name,
				Username = user.UserName,
				Email = user.Email,
				Roles = roles,
			};

			return Ok(currentUserDTO);
        }

        [HttpGet]
		public async Task<ActionResult<CurrentUserDto>> GetRole()
		{
			var user = await userManager.GetUserAsync(HttpContext.User);
			var roles = await userManager.GetRolesAsync(user);

			var currentUserDTO = new CurrentUserDto
			{
				Name = user.Name,
				Username = user.UserName,
				Email = user.Email,
				Roles = roles,
			};

			return Ok(currentUserDTO);
		}
	}
}