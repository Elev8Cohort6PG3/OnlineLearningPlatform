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
			CreateMap<Video, VideoDto>();
			CreateMap<VideoDto, Video>();
			CreateMap<Video, VideoDto[]>();
			CreateMap<Video[], VideoDto[]>();
			CreateMap<Course, CourseDto>();
			CreateMap<CourseDto, Course>();
			CreateMap<Course, CourseWithoutVideoDto>();
			CreateMap<MemberUpdateDto, AppUser>();
			CreateMap<Enrollment, EnrollmentDto>();
			CreateMap<EnrollmentDto, Enrollment>();
		}

	}
}
