using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineLearningPlatform.Entities
{
	[Table("Courses")]
	public class Course
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public string Category{ get; set; }
		public int EnrollmentCount { get; set; }

		//relationship properties
		public int AppUserId { get; set; }
		public AppUser AppUser { get; set; }
	}
}
