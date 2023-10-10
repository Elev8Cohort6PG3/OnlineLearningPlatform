using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using OnlineLearningPlatform.Data;
using OnlineLearningPlatform.DTOs;
using OnlineLearningPlatform.Entities;
using OnlineLearningPlatform.Extensions;
using OnlineLearningPlatform.Interfaces;

namespace OnlineLearningPlatform.Controllers
{
	public class CourseController : BaseApiController
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;

		public CourseController(IUnitOfWork unitOfWork, IMapper mapper)
		{
			_unitOfWork = unitOfWork;
			_mapper = mapper;
		}

		[HttpGet]
		public async Task<ActionResult> GetCourses()
		{
			var courses = await _unitOfWork.CourseRepository.GetCourses();

			if (courses == null) return NotFound("Failed to find courses");
			
			return Ok(courses);
		}

		[HttpGet("{id:int}")]
		public async Task<ActionResult<Course>> GetCourse(int id)
		{
			var course = await _unitOfWork.CourseRepository.GetCourse(id);

			if (course == null) return NotFound("Failed to find the course");

			return Ok(course);
		}

		[HttpGet("all-courses/{username}")]
		public async Task<ActionResult<IEnumerable<CourseDto>>> GetAllCoursesForLecturer(string username)
		{
			var courses = await _unitOfWork.CourseRepository.GetAllCoursesForLecturer(username);

			if (courses == null) return NotFound("Failed to find courses");

			return Ok(courses);
		}

		[HttpPost]
		public async Task<ActionResult> AddCourseToUser(CourseDto courseDto)
		{
			var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
			
			if (user == null) return NotFound("User is not exist");

			var newCourse = new Course();
			
			_mapper.Map(courseDto, newCourse);

			_unitOfWork.CourseRepository.AddCourseToUser(newCourse, user);

			if (await _unitOfWork.Complete()) return Ok("The course has been successfully created");

			return BadRequest("Failed to create course");
		}


		[HttpPut]
		public async Task<ActionResult> UpdateCourse(CourseUpdateDto courseUpdateDto)
		{
			var course = await _unitOfWork.CourseRepository.GetCourseForModification(courseUpdateDto.Id);

			if (course == null) return NotFound("Failed to find course");

			course.Videos.Clear();

			_mapper.Map(courseUpdateDto, course);

			if (await _unitOfWork.Complete()) return NoContent();

			return BadRequest("Failed to update course");
		}

		[HttpDelete("delete-course/{courseId:int}")]
		public async Task<ActionResult> DeleteCourse(int courseId)
		{
			 var course = await _unitOfWork.CourseRepository.GetCourseForModification(courseId);

			if (course == null) return NotFound();

			 _unitOfWork.CourseRepository.DeleteCourse(course);

			 if (await _unitOfWork.Complete()) return Ok();

			 return BadRequest("Failed to delete course");
		}
	}
}
