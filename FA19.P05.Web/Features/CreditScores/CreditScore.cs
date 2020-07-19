using FA19.P05.Web.Features.Authorization;

namespace FA19.P05.Web.Features.CreditScores
{
    public class CreditScore
    {
        public int Id { get; set; }

        public int CreditNumber { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}
