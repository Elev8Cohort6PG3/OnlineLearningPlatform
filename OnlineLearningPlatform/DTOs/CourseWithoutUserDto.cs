namespace OnlineLearningPlatform.DTOs
{
	public class CourseWithoutUserDto
	{
		public CourseWithoutVideoDto CourseWithoutVideoDto { get; set; }
		public List<VideoDto> VideoDto { get; set; } = new();
	}
}
