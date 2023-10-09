using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using OnlineLearningPlatform.DTOs;
using OnlineLearningPlatform.Entities;
using OnlineLearningPlatform.Extensions;
using OnlineLearningPlatform.Interfaces;

namespace OnlineLearningPlatform.Controllers
{
	public class EnrollmentController : BaseApiController
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;

		public EnrollmentController(IUnitOfWork unitOfWork, IMapper mapper)
		{
			_unitOfWork = unitOfWork;
			_mapper = mapper;
		}

		[HttpGet("{id:int}")]
		public async Task<ActionResult<Enrollment>> GetEnrollment(int id)
		{
			var enrollment = await _unitOfWork.EnrollmentRepository.GetEnrollment(id);

			if (enrollment == null) return NotFound("Failed to find the enrollment");

			return Ok(enrollment);
		}

		[HttpPost("{courseId:int}")]
		public async Task<ActionResult> AddEnrollmentToCourse(int courseId)
		{
			var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
			if (user == null) return NotFound("User is not exist");

			_unitOfWork.EnrollmentRepository.AddEnrollmentToCourse(user, courseId);

			if (await _unitOfWork.Complete()) return Ok("The enrollment has been successfully added to the course");

			return BadRequest("Failed to create the enrollment for the course");
		}
	}
}
