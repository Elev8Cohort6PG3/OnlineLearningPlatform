using Microsoft.EntityFrameworkCore;
using OnlineLearningPlatform.Data;
using OnlineLearningPlatform.Interfaces;

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

			services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
			services.AddScoped<IUnitOfWork, UnitOfWork>();

			return services;
		}
	}
}
