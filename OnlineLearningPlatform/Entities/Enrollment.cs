using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineLearningPlatform.Entities
{
	[Table("Enrollments")]
	public class Enrollment
	{
		public int Id { get; set; }
		public DateTime EnrollmentDate { get; set; }
		public double CompletionPercentage { get; set; }

		//relationship properties
		public int CourseId { get; set; }
		public Course Course { get; set; }
		public int AppUserId { get; set; }
		public AppUser AppUser { get; set; }
	}
}
