using System.Reflection;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using FA19.P05.Web.Data;
using FA19.P05.Web.Features.Authorization;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;

namespace FA19.P05.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        readonly string AllowAllHeaders = "_AllowAllHeaders";


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllHeaders",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000/")
                   .AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod();
        });
            });


            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0)
                .AddFluentValidation(x=>x.RunDefaultMvcValidationAfterFluentValidationExecutes = false);// See: https://fluentvalidation.net/aspnet#asp-net-core

            services.AddDbContext<DataContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DataContext")));

            services.AddDefaultIdentity<User>()
                .AddRoles<Role>()
                .AddEntityFrameworkStores<DataContext>();

            services.ConfigureApplicationCookie(options =>
            {
                options.Events.OnRedirectToLogin = context =>
                {
                    context.Response.StatusCode = 401;
                    return Task.CompletedTask;
                };
            });

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddControllers();

            // See: https://docs.microsoft.com/en-us/aspnet/core/tutorials/getting-started-with-swashbuckle?view=aspnetcore-3.0&tabs=visual-studio
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
            });

            var webAssembly = Assembly.GetAssembly(typeof(Startup));

            // See: https://automapper.readthedocs.io/en/latest/Dependency-injection.html#asp-net-core
            services.AddAutoMapper(webAssembly);

            // See: https://fluentvalidation.net/aspnet#asp-net-core
            services.AddValidatorsFromAssembly(webAssembly);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            MigrateDb(app);

            // This isn't ideal, but the proper way is significantly more complex and really obscures what is happening
            SeedRoles(app).GetAwaiter().GetResult();
            SeedUsers(app).GetAwaiter().GetResult();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseRouting();

            // see: https://docs.microsoft.com/en-us/aspnet/core/migration/22-to-30?view=aspnetcore-3.0&tabs=visual-studio#authorization
            app.UseCookiePolicy();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseCors(AllowAllHeaders);


            app.UseEndpoints(endpoints =>
            {
                // see: https://docs.microsoft.com/en-us/aspnet/core/migration/22-to-30?view=aspnetcore-3.0&tabs=visual-studio#mvc-controllers
                endpoints.MapControllers().RequireCors("AllowAllHeaders");
            });

			app.UseSpa(spa =>
			{
				spa.Options.SourcePath = "ClientApp";

				if (env.IsDevelopment())
				{
					//spa.UseReactDevelopmentServer(npmScript: "start");
					spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
				}
			});
		}

        private static async Task SeedUsers(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var userManager = serviceScope.ServiceProvider.GetService<UserManager<User>>();
                var user = new User {UserName = "admin", Name = "Matt", Email = "cool@email.com"};
                if (await userManager.FindByNameAsync(user.UserName) != null)
                {
                    return;
                }
                await userManager.CreateAsync(user, "Password123!");
                await userManager.AddToRoleAsync(user, UserRoles.Admin);
            }
        }

        private static async Task SeedRoles(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var roleManager = serviceScope.ServiceProvider.GetService<RoleManager<Role>>();
                foreach (var roleName in UserRoles.All)
                {
                    if (!await roleManager.RoleExistsAsync(roleName))
                    {
                        await roleManager.CreateAsync(new Role {Name = roleName});
                    }
                }
            }
        }

        private static void MigrateDb(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<DataContext>();
               context.Database.Migrate();
            }
        }
    }
}
