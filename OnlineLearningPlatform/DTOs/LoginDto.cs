﻿using System.ComponentModel.DataAnnotations;

namespace OnlineLearningPlatform.DTOs
{
	public class LoginDto
	{
		[Required] public string Username { get; set; }
		[Required] public string Password { get; set; }
	}
}
