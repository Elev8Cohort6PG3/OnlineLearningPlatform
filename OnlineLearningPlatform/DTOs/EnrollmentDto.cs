namespace OnlineLearningPlatform.DTOs
{
	public class EnrollmentDto
	{
		public int Id { get; set; }
		public DateTime EnrollmentDate { get; set; }
		public double CompletionPercentage { get; set; }
		public int CourseId { get; set; }
		public int AppUserId { get; set; }
	}
}
