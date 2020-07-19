using AutoMapper;

namespace FA19.P05.Web.Features.CreditScores
{
    public class CreditScoreMappingProfile : Profile
    {
        public CreditScoreMappingProfile()
        {
            CreateMap<CreditScore, CreditScoreDto>()
                .ReverseMap();
        }
    }
}