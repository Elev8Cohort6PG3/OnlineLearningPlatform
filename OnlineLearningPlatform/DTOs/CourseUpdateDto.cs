namespace OnlineLearningPlatform.DTOs
{
	public class CourseUpdateDto
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public string Category { get; set; }
		public string ImageUrl { get; set; }
		public List<VideoDto> Videos { get; set; }

	}
}
