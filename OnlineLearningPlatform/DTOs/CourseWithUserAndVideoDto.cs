using OnlineLearningPlatform.Entities;

namespace OnlineLearningPlatform.DTOs
{
	public class CourseWithUserAndVideoDto
	{
		public CourseWithoutVideoDto CourseWithoutVideoDto { get; set; }
		public List<VideoDto> VideoDto { get; set; } = new();
		public string userName { get; set; }

	}
}
