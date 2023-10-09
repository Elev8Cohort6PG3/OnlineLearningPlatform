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

		public CourseRepository(DataContext dataContext, IMapper mapper )
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

		/*public async Task<Course> UpdateCourse(CourseUpdateDto courseUpdateDto)
		{
			//await _dataContext.Courses.FindAsync(courseUpdateDto.Id);

		}*/

		public async Task<CourseDto> GetCourse(int id)
		{
			//return _mapper.Map<CourseDto>(await _dataContext.Courses.FindAsync(id));

			//return await _dataContext.Courses.Include(v => v.Videos).FirstOrDefaultAsync(x => x.Id == id);

			return _mapper.Map<CourseDto>( await _dataContext.Courses.Include(v => v.Videos).FirstOrDefaultAsync(x => x.Id == id));

			/*var query = _dataContext.Courses.AsQueryable();

			return await query
				.Include(v => v.Videos)
				/*.Include(u => u.AppUserId)#1#
				.Where(x => x.Id == id).FirstOrDefaultAsync();*/

			/*var query = _dataContext.Courses.AsQueryable();

			var firstQuery = query.Include(v => v.Videos);
			var secondQuery = firstQuery.Include(u => u.AppUserId);

			return await secondQuery.FirstOrDefaultAsync(x => x.Id == id);*/


		}

		public async Task<IEnumerable<CourseDto>> GetCourses()
		{
			var query = _dataContext.Courses.AsQueryable();
			var courses = query
				.Include(v => v.Videos)
				.ProjectTo<CourseDto>(_mapper.ConfigurationProvider);

			return await courses.ToListAsync();

			/*var query = _dataContext.Courses.AsQueryable();

			return await query
				.Include(v => v.Videos)
				/*.Include(u => u.AppUserId)#1#
				.ToListAsync();*/
		}
	}
}
