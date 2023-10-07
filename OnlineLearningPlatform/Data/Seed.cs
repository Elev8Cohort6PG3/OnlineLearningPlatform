using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OnlineLearningPlatform.Entities;

namespace OnlineLearningPlatform.Data
{
	public class Seed
	{
		//TODO Add users to seed
		public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
		{
			if (await userManager.Users.AnyAsync()) return;

			var roles = new List<AppRole>()
			{
				new AppRole{Name = "Member"},
				new AppRole{Name = "Admin"},
				new AppRole{Name = "Lecturer"}
			};

			foreach (var role in roles)
			{
				await roleManager.CreateAsync(role);
			}

			var admin = new AppUser()
			{
				UserName = "admin"
			};

			await userManager.CreateAsync(admin, "Pa$$w0rd");
			await userManager.AddToRolesAsync(admin, new[] { "Admin", "Lecturer" });
		}
	}
}
