namespace OnlineLearningPlatform.DTOs
{
	public class MemberDto
	{
		public int Id { get; set; }
		public string UserName { get; set; }
		
		//TODO make them not optional later
		public string? FirstName { get; set; }
		public string? LastName { get; set; }
		public string? Email { get; set; }
	}
}
