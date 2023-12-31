﻿using System.ComponentModel.DataAnnotations;

namespace OnlineLearningPlatform.DTOs
{
	public class RegisterDto
	{
		[Required] public string Username { get; set; }
		[Required][StringLength(16, MinimumLength = 4)] public string Password { get; set; }

		//TODO make them required later
		public string? FirstName { get; set; }
		public string? LastName { get; set; }
		public string? Email { get; set; }
	}
}
