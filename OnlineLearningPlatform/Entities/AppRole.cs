using Microsoft.AspNetCore.Identity;

namespace OnlineLearningPlatform.Entities
{
	public class AppRole : IdentityRole<int>
	{
		public List<AppUserRole> UserRoles { get; set; }
	}
}
