using OnlineLearningPlatform.Entities;

namespace OnlineLearningPlatform.DTOs
{
	public class CourseDto
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public string Category { get; set; }
		public int EnrollmentCount { get; set; }
		public string ImageUrl { get; set; }
		public List<Video> Videos { get; set; } = new();

	}
}
