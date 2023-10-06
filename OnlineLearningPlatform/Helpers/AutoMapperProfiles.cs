using AutoMapper;
using OnlineLearningPlatform.DTOs;
using OnlineLearningPlatform.Entities;

namespace OnlineLearningPlatform.Helpers
{
	public class AutoMapperProfiles : Profile
	{
		public AutoMapperProfiles()
		{
			CreateMap<AppUser, MemberDto>();
			CreateMap<RegisterDto, AppUser>();
		}

	}
}
