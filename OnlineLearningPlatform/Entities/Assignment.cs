using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineLearningPlatform.Entities
{
	[Table("Assignments")]
	public class Assignment
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public DateTime DueDate { get; set; }

		//relationship properties
		public int CourseId { get; set; }
		public Course Course{ get; set; }

	}
}
