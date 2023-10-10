using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using OnlineLearningPlatform.DTOs;
using OnlineLearningPlatform.Entities;
using OnlineLearningPlatform.Interfaces;

namespace OnlineLearningPlatform.Data
{
	public class EnrollmentRepository : IEnrollmentRepository
	{
		private readonly DataContext _dataContext;
		private readonly IMapper _mapper;
		private readonly ICourseRepository _courseRepository;

		public EnrollmentRepository(DataContext dataContext, IMapper mapper, ICourseRepository courseRepository)
		{
			_dataContext = dataContext;
			_mapper = mapper;
			_courseRepository = courseRepository;
		}

		public async Task AddEnrollmentToCourse(AppUser appUser, int courseId)
		{
			var enrollment = new Enrollment()
			{
				EnrollmentDate = DateTime.UtcNow,
				CompletionPercentage = 0,
				CourseId = courseId,
				AppUserId = appUser.Id
			};

			var course = await _courseRepository.GetCourseForModification(courseId);
			course.EnrollmentCount++;

			_dataContext.Enrollments.Add(enrollment);
		}

		public async Task<EnrollmentDto> GetEnrollmentDto(int id)
		{
			var query = from enrollment in _dataContext.Set<Enrollment>()
				join appUser in _dataContext.Set<AppUser>()
					on enrollment.AppUserId equals appUser.Id
				join course in _dataContext.Set<Course>() on enrollment.CourseId equals course.Id
				where course.Id == id
				select new EnrollmentDto()
				{
					Id = enrollment.Id,
					EnrollmentDate = enrollment.EnrollmentDate,
					CompletionPercentage = enrollment.CompletionPercentage,
					AppUserId = appUser.Id,
					CourseId = course.Id
				};

			return await query.FirstOrDefaultAsync();
		}	
		
		public async Task<Enrollment> GetEnrollment(int id)
		{
			return await _dataContext.Enrollments
				.Where(e => e.Id == id)
				.SingleOrDefaultAsync();
		}

		public async Task<IEnumerable<EnrollmentDto>> GetAllEnrollmentsForUser(string username)
		{
			var query = from enrollment in _dataContext.Set<Enrollment>()
				join appUser in _dataContext.Set<AppUser>()
					on enrollment.AppUserId equals appUser.Id
				join course in _dataContext.Set<Course>() on enrollment.CourseId equals course.Id 
				where appUser.UserName == username
				select  new EnrollmentDto()
				{
					Id = enrollment.Id,
					EnrollmentDate = enrollment.EnrollmentDate,
					CompletionPercentage = enrollment.CompletionPercentage,
					AppUserId = appUser.Id,
					CourseId = course.Id
				};

			return await query.ToListAsync();
		}

		public void DeleteEnrollment(Enrollment enrollment)
		{
			_dataContext.Enrollments.Remove(enrollment);
		}
	}
}