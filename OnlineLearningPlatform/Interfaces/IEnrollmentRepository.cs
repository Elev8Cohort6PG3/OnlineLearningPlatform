using OnlineLearningPlatform.DTOs;
using OnlineLearningPlatform.Entities;

namespace OnlineLearningPlatform.Interfaces
{
	public interface IEnrollmentRepository
	{
		Task AddEnrollmentToCourse(AppUser appUser, int courseId);
		Task<EnrollmentDto> GetEnrollmentDto(int id);
		Task<Enrollment> GetEnrollment(int id);
		Task<IEnumerable<EnrollmentDto>> GetAllEnrollmentsForUser(string username);
		public Task<IEnumerable<EnrollmentDto>> GetAllEnrollmentsForCourse(int courseId);
		void DeleteEnrollment(Enrollment enrollment);
		Task<double> GetCompletionRate(int userId, int courseId);

	}
}
