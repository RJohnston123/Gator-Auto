using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FA19.P05.Web.Features.CreditScores
{
    public class CreditScoreConfiguration : IEntityTypeConfiguration<CreditScore>
    {
        public void Configure(EntityTypeBuilder<CreditScore> builder)
        {
            builder.HasIndex(x => x.UserId)
                .IsUnique();
        }
    }
}