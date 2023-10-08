using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using OnlineLearningPlatform.DTOs;
using OnlineLearningPlatform.Entities;
using OnlineLearningPlatform.Interfaces;

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

		public void AddCourse(Course course)
		{
			_dataContext.Courses.Add(course);
		}

		public void DeleteCourse(Course course)
		{
			_dataContext.Courses.Remove(course);
		}

		public async Task<CourseDto> GetCourse(int id)
		{
			return _mapper.Map<CourseDto>(await _dataContext.Courses.FindAsync(id));
		}

		public async Task<IEnumerable<CourseDto>> GetCourses()
		{
			var query = _dataContext.Courses.AsQueryable();
			var courses = query
				.Include(v => v.Videos)
				.ProjectTo<CourseDto>(_mapper.ConfigurationProvider);

			return await courses.ToListAsync();
		}
	}
}
