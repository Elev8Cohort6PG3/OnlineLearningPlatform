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
		private readonly IMapper _mapper;

		public UsersController(IUnitOfWork unitOfWork, IMapper mapper)
		{
			_unitOfWork = unitOfWork;
			_mapper = mapper;
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

		[HttpPut]
		public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
		{
			var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

			if (user == null) return NotFound();

			_mapper.Map(memberUpdateDto, user);

			if (await _unitOfWork.Complete()) return NoContent();

			return BadRequest("Failed to update user");
		}
	}
}
