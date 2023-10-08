using OnlineLearningPlatform.DTOs;
using OnlineLearningPlatform.Entities;

namespace OnlineLearningPlatform.Interfaces
{
	public interface IUnitOfWork
	{
		IUserRepository UserRepository { get; }
		ICourseRepository CourseRepository { get; }
		Task<bool> Complete();
		bool HasChanges();
	}
}
