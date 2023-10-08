using Microsoft.AspNetCore.Identity;

namespace OnlineLearningPlatform.Entities
{
	public class AppUser : IdentityUser<int>
	{
		public string FirstName { get; set; }
		public string LastName { get; set; }

		public List<AppUserRole> UserRoles { get; set; }
	}
}
