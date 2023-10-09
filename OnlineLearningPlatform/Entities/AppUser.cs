using Microsoft.AspNetCore.Identity;

namespace OnlineLearningPlatform.Entities
{
	public class AppUser : IdentityUser<int>
	{
		//TODO make them not optional later
		public string? FirstName { get; set; }
		public string? LastName { get; set; }
		public string? Email { get; set; }

		public List<AppUserRole> UserRoles { get; set; }
		public List<Enrollment> Enrollments { get; set; } = new();

	}
}
