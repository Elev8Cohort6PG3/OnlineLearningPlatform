using OnlineLearningPlatform.Entities;

namespace OnlineLearningPlatform.Interfaces
{
	public interface ITokenService
	{
		Task<string> CreateToken(AppUser user);
	}
}
