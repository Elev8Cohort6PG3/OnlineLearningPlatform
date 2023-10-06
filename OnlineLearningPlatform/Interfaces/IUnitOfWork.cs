using OnlineLearningPlatform.DTOs;
using OnlineLearningPlatform.Entities;

namespace OnlineLearningPlatform.Interfaces
{
	public interface IUnitOfWork
	{
		IUserRepository UserRepository { get; }
		Task<bool> Complete();
		bool HasChanges();
	}
}
