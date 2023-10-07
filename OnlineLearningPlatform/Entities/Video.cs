using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineLearningPlatform.Entities
{
	[Table("Videos")]
	public class Video
	{
		public int Id { get; set; }
		public string Url { get; set; }
		public string Description { get; set; }
		
		//relationship properties
		public int CourseId { get; set; }
		public Course Course { get; set; }


	}
}
