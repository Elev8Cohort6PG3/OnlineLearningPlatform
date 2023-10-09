using System.Collections;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using OnlineLearningPlatform.DTOs;
using OnlineLearningPlatform.Entities;
using OnlineLearningPlatform.Interfaces;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace OnlineLearningPlatform.Data
{
	public class CourseRepository : ICourseRepository
	{
		private readonly DataContext _dataContext;
		private readonly IMapper _mapper;

		public CourseRepository(DataContext dataContext, IMapper mapper)
		{
			_dataContext = dataContext;
			_mapper = mapper;
		}

		public void AddCourseToUser(Course course, AppUser appUser)
		{
			course.AppUser = appUser;
			course.AppUserId = appUser.Id;

			_dataContext.Courses.Add(course);
		}

		public void DeleteCourse(Course course)
		{
			_dataContext.Courses.Remove(course);
		}

		public async Task<CourseWithUserAndVideoDto> GetCourse(int id)
		{
			var query = from Course in _dataContext.Set<Course>()
				join AppUser in _dataContext.Set<AppUser>()
					on Course.AppUserId equals AppUser.Id
					where Course.Id == id
				select new CourseWithUserAndVideoDto()
				{
					CourseWithoutVideoDto = _mapper.Map<CourseWithoutVideoDto>(Course),
					userName = AppUser.UserName,
					VideoDto = Course.Videos.Select(video => _mapper.Map<VideoDto>(video)).ToList()
				};

			return await query.FirstOrDefaultAsync();
		}

		public async Task<IEnumerable<CourseWithUserAndVideoDto>> GetCourses()
		{
			var query = from Course in _dataContext.Set<Course>()
				join AppUser in _dataContext.Set<AppUser>()
					on Course.AppUserId equals AppUser.Id
				select new CourseWithUserAndVideoDto()
				{
					CourseWithoutVideoDto = _mapper.Map<CourseWithoutVideoDto>(Course),
					userName = AppUser.UserName,
					VideoDto = Course.Videos
						.Select(video => _mapper.Map<VideoDto>(video))
						.ToList()
				};

			return await query.ToListAsync();
		}

		public async Task<IEnumerable<CourseWithoutUserDto>> GetAllCoursesForLecturer(string username)
		{
			var query = from Course in _dataContext.Set<Course>()
				join AppUser in _dataContext.Set<AppUser>()
					on Course.AppUserId equals AppUser.Id
					where AppUser.UserName == username
				select new CourseWithoutUserDto()
				{
					CourseWithoutVideoDto = _mapper.Map<CourseWithoutVideoDto>(Course),
					VideoDto = Course.Videos
						.Select(video => _mapper.Map<VideoDto>(video))
						.ToList()
				};

			return await query.ToListAsync();
		}
	}
}