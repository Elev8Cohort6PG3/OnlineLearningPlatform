using Microsoft.EntityFrameworkCore;

namespace OnlineLearningPlatform.Data
{
	public class DataContext : DbContext
	{
		public DataContext(DbContextOptions options) : base(options)
		{
		}
	}
}
