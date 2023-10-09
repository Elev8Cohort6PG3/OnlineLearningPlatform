using OnlineLearningPlatform.Entities;

namespace OnlineLearningPlatform.DTOs
{
	public class CourseWithUserAndVideoDto
	{
		public CourseWithoutVideoDto CourseWithoutVideoDto { get; set; }
		public VideoDto VideoDto { get; set; } 
		public string userName { get; set; }

	}
}
