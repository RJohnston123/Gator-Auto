using FA19.P05.Web.Features.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace FA19.P05.Web.Data
{
    public class DataContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(DataContext).Assembly);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // So, EF silently gives us a "feature" where the whole table is pulled down and has client side evaluation
            // see: https://elanderson.net/2019/01/entity-framework-core-client-side-evaluation/
            // Client-side evaluation means we can do things that cannot be converted from C# LINQ to SQL statements
            // we want an exception (rather than silently allowing it) so we can fix the case in question (since we could pull down an entire table without knowning)
            optionsBuilder.ConfigureWarnings(w => w.Throw(RelationalEventId.QueryClientEvaluationWarning));
            base.OnConfiguring(optionsBuilder);
        }
    }
}
