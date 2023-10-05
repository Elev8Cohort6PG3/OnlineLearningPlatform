namespace OnlineLearningPlatform.Errors
{
	public record ApiException(int StatusCode, string Message, string Details)
	{
		
	}
}
