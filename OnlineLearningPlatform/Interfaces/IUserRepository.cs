﻿using OnlineLearningPlatform.DTOs;
using OnlineLearningPlatform.Entities;

namespace OnlineLearningPlatform.Interfaces
{
	public interface IUserRepository
	{
		void Update(AppUser user);
		Task<IEnumerable<AppUser>> GetUsersAsync();
		Task<AppUser> GetUserByIdAsync(int id);
		Task<AppUser> GetUserByUsernameAsync(string username);
		Task<MemberDto[]> GetMembersAsync();
		Task<MemberDto> GetMemberAsync(string username);
	}
}