using Microsoft.EntityFrameworkCore;
using OnlineLearningPlatform.Data;

namespace OnlineLearningPlatform.Extensions
{
	public static class ApplicationServiceExtensions
	{
		public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
		{
			services.AddDbContext<DataContext>(opt =>
			{
				opt.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
			});

			return services;
		}
	}
}
