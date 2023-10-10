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

		public void AddEnrollmentToCourse(AppUser appUser, int courseId)
		{
			var enrollment = new Enrollment()
			{
				EnrollmentDate = DateTime.UtcNow,
				CompletionPercentage = 0,
				CourseId = courseId,
				AppUserId = appUser.Id
			};

			var course = _courseRepository.GetCourseForModification(courseId);
			course.Result.EnrollmentCount++;

			_dataContext.Enrollments.Add(enrollment);
		}

		public async Task<EnrollmentDto> GetEnrollmentDto(int id)
		{
			return await _dataContext.Enrollments
				.Where(e => e.Id == id)
				.ProjectTo<EnrollmentDto>(_mapper.ConfigurationProvider)
				.SingleOrDefaultAsync();
		}	
		
		public async Task<Enrollment> GetEnrollment(int id)
		{
			return await _dataContext.Enrollments
				.Where(e => e.Id == id)
				.SingleOrDefaultAsync();
		}

		/*public async Task<Enrollment> UpdateEnrollment(EnrollmentUpdateDto enrollmentUpdateDto)
		{

		}*/
	}
}