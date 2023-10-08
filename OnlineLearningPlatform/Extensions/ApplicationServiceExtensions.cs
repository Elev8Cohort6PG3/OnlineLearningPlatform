using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using OnlineLearningPlatform.Data;
using OnlineLearningPlatform.Interfaces;
using OnlineLearningPlatform.Services;

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

			/*services.ConfigureHttpJsonOptions(opt =>
			{
				opt.SerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
			});*/

			services.AddCors();

			services.AddScoped<ITokenService, TokenService>();
			services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
			services.AddScoped<IUnitOfWork, UnitOfWork>();

			return services;
		}
	}
}
