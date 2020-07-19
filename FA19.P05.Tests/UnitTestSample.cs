using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using FA19.P05.Tests.Extensions;
using FA19.P05.Tests.Helpers;
using FA19.P05.Web.Controllers;
using FA19.P05.Web.Features.Authorization;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace FA19.P05.Tests
{
    // 383 students, you should add tests to help ensure your API is working as you expect
    [TestClass]
    public class SampleTest
    {
        [TestMethod]
        public async Task CustomerCanRegister()
        {
            using (var webServer = TestHelper.GetTestWeb())
            {
                var userDto = new CreateCustomerDto
                {
                    Email = "newCustomer@email.com",
                    Password = "Password123!",
                    Name = "Matt",
                    Username = "newCustomer"
                };
                var webClient = webServer.CreateClient();
                var httpResponse = await webClient.PostAsJsonAsync("/api/customer", userDto);
                Assert.AreEqual(HttpStatusCode.OK, httpResponse.StatusCode);
                var resultDto = await httpResponse.Content.ReadAsJsonAsync<UserDto>();

                Assert.IsTrue(resultDto.Id > 0);
            }
        }

        [TestMethod]
        public async Task AdminCanHitCreateUser()
        {
            using (var webServer = TestHelper.GetTestWeb())
            {
                var webClient = webServer.CreateClient();
                await LoginAsAdmin(webClient);

                var httpResponse = await webClient.PostAsJsonAsync("/api/user", new CreateUserDto
                {
                    Email = "newCustomUser@email.com",
                    Password = "Password123!",
                    Name = "Matt",
                    Username = "newCustomUser",
                    Roles = new List<int>
                    {
                        1
                    }
                });
                Assert.AreEqual(HttpStatusCode.OK, httpResponse.StatusCode);
            }
        }

        [TestMethod]
        public async Task CreateUserIsAuthenticated()
        {
            using (var webServer = TestHelper.GetTestWeb())
            {
                var webClient = webServer.CreateClient();
                var httpResponse = await webClient.PostAsJsonAsync("/api/user", new CreateUserDto());
                Assert.AreEqual(HttpStatusCode.Unauthorized, httpResponse.StatusCode);
            }
        }

        private static async Task LoginAsAdmin(HttpClient webClient)
        {
            var userDto = new LoginDto
            {
                Password = "Password123!",
                Username = "admin"
            };
            var httpResponse = await webClient.PostAsJsonAsync("/api/authentication", userDto);
            Assert.AreEqual(HttpStatusCode.OK, httpResponse.StatusCode);
        }
    }
}
