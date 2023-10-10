using OnlineLearningPlatform.DTOs;
using OnlineLearningPlatform.Entities;

namespace OnlineLearningPlatform.Interfaces
{
	public interface IEnrollmentRepository
	{
		void AddEnrollmentToCourse(AppUser appUser, int courseId);
		Task<EnrollmentDto> GetEnrollmentDto(int id);
		Task<Enrollment> GetEnrollment(int id);
	}
}
