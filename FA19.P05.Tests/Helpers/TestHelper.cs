using System;
using System.Collections.Generic;
using FA19.P05.Web;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration.Memory;

namespace FA19.P05.Tests.Helpers
{

    public class TestHelper
    {
        public static CustomWebApplicationFactory<Startup> GetTestWeb()
        {
            return new CustomWebApplicationFactory<Startup>();
        }
    }
    public class CustomWebApplicationFactory<TStartup> : WebApplicationFactory<TStartup> where TStartup : class
    {
        protected override void ConfigureWebHost(IWebHostBuilder x)
        {
            x.ConfigureAppConfiguration(y =>
            {
                var connection = AssemblySetup.GetConnection();
                y.Add(new MemoryConfigurationSource
                {
                    InitialData = new List<KeyValuePair<string, string>>
                    {
                        new KeyValuePair<string, string>("ConnectionStrings:DataContext", connection),
                        new KeyValuePair<string, string>("Logging:LogLevel:Microsoft", "Warning")
                    }
                });
            });
            base.ConfigureWebHost(x);
        }
    }
}
