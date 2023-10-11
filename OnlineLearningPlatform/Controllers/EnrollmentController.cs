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
			var enrollment = await _unitOfWork.EnrollmentRepository.GetEnrollmentDto(id);

			if (enrollment == null) return NotFound("Failed to find the enrollment");

			return Ok(enrollment);
		}

		[HttpGet("user/{username}")]
		public async Task<ActionResult<IEnumerable<EnrollmentDto>>> GetAllEnrollmentsForUser(string username)
		{
			var enrollments = await _unitOfWork.EnrollmentRepository.GetAllEnrollmentsForUser(username);

			if (enrollments == null) return NotFound("Failed to find enrollments");

			return Ok(enrollments);
		}

		[HttpGet("course/{courseId:int}")]
		public async Task<ActionResult<IEnumerable<EnrollmentDto>>> GetAllEnrollmentsForCourse(int courseId)
		{
			var courses = await _unitOfWork.EnrollmentRepository.GetAllEnrollmentsForCourse(courseId);

			if (courses == null) return NotFound("Failed to find courses");

			return Ok(courses);
		}

		[HttpGet]
		public async Task<ActionResult<double>> GetCompletionRate([FromQuery] int userId, [FromQuery] int courseId)
		{
			var completionRate = await _unitOfWork.EnrollmentRepository.GetCompletionRate(userId, courseId);

			if (completionRate == null) return NotFound("Failed to find the completion rate");

			return Ok(completionRate);

		}

		[HttpPost("{courseId:int}")]
		public async Task<ActionResult> AddEnrollmentToCourse(int courseId)
		{
			var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

			if (user == null) return NotFound("User is not exist");

			await _unitOfWork.EnrollmentRepository.AddEnrollmentToCourse(user, courseId);

			if (await _unitOfWork.Complete()) return Ok("The enrollment has been successfully added to the course");

			return BadRequest("Failed to create the enrollment for the course");
		}

		[HttpPut]
		public async Task<ActionResult<Enrollment>> UpdateEnrollment(EnrollmentUpdateDto enrollmentUpdateDto)
		{
			var enrollment = await _unitOfWork.EnrollmentRepository.GetEnrollment(enrollmentUpdateDto.Id);

			if (enrollment == null) return NotFound("Enrollment is not exist");

			_mapper.Map(enrollmentUpdateDto, enrollment);

			if (await _unitOfWork.Complete()) return NoContent();

			return BadRequest("Failed to update enrollment");
		}

		[HttpDelete("delete-enrollment/{enrollmentId:int}")]
		public async Task<ActionResult> DeleteEnrollment(int enrollmentId)
		{
			var enrollment = await _unitOfWork.EnrollmentRepository.GetEnrollment(enrollmentId);

			if (enrollment == null) return NotFound();

			_unitOfWork.EnrollmentRepository.DeleteEnrollment(enrollment);

			if (await _unitOfWork.Complete()) return Ok();

			return BadRequest("Failed to delete the enrollment");
		}
	}
}