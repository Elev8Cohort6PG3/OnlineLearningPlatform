using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using OnlineLearningPlatform.DTOs;
using OnlineLearningPlatform.Extensions;
using OnlineLearningPlatform.Interfaces;

namespace OnlineLearningPlatform.Controllers
{
	public class UsersController : BaseApiController
	{
		private readonly IUnitOfWork _unitOfWork;

		public UsersController(IUnitOfWork unitOfWork)
		{
			_unitOfWork = unitOfWork;
		}

		[HttpGet]
		public async Task<ActionResult<MemberDto>> GetUsers()
		{
			return Ok(await _unitOfWork.UserRepository.GetMembersAsync());
		}

		[HttpGet("{username}")]
		public async Task<ActionResult<MemberDto>> GetUser(string username)
		{
			return Ok(await _unitOfWork.UserRepository.GetMemberAsync(username));
		}
	}
}
