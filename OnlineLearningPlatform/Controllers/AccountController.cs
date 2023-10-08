using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineLearningPlatform.DTOs;
using OnlineLearningPlatform.Entities;
using OnlineLearningPlatform.Interfaces;

namespace OnlineLearningPlatform.Controllers
{
	public class AccountController : BaseApiController
	{
		private readonly UserManager<AppUser> _userManager;
		private readonly ITokenService _tokenService;
		private readonly IMapper _mapper;

		public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, IMapper mapper)
		{
			_userManager = userManager;
			_tokenService = tokenService;
			_mapper = mapper;
		}

		[HttpPost("register/{role}")]
		public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto, string role)
		{
			if (!role.Equals("member") && !role.Equals("lecturer"))
				return BadRequest("You must register as a member or lecturer only");

			if (await IsUserExists(registerDto.Username)) return BadRequest("Username is taken");

			var user = _mapper.Map<AppUser>(registerDto);

			user.UserName = registerDto.Username.ToLower();

			var result = await _userManager.CreateAsync(user, registerDto.Password);

			if (!result.Succeeded) return BadRequest(result.Errors);

			var roleResult = await _userManager.AddToRoleAsync(user, role);

			if (!roleResult.Succeeded) return BadRequest(roleResult.Errors);

			return Ok(new UserDto()
			{
				Username = user.UserName,
				Token = await _tokenService.CreateToken(user)
			});
		}
		
		[HttpPost("login")]
		public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
		{
			var user = await _userManager.Users
				.SingleOrDefaultAsync(user => user.UserName == loginDto.Username);

			if (user == null) return Unauthorized("Invalid Username");

			var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

			if (!result) return Unauthorized("Invalid Password");


			return Ok(new UserDto()
			{
				Username = user.UserName,
				Token = await _tokenService.CreateToken(user)
			});
		}

		private async Task<bool> IsUserExists(string username)
		{
			return await _userManager.Users.AnyAsync(user => user.UserName == username.ToLower());
		}
	}
}
