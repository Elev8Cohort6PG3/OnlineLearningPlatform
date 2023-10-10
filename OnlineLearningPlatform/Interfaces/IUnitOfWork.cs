using OnlineLearningPlatform.DTOs;
using OnlineLearningPlatform.Entities;

namespace OnlineLearningPlatform.Interfaces
{
	public interface IUnitOfWork
	{
		IUserRepository UserRepository { get; }
		ICourseRepository CourseRepository { get; }
		IEnrollmentRepository EnrollmentRepository { get; }
		Task<bool> Complete();
	}
}
