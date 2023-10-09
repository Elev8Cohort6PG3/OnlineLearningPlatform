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
		public async Task<ActionResult<IEnumerable<Course>>> GetCourses()
		{
			//return Ok(await _unitOfWork.CourseRepository.GetCourses());

			var courses = await _unitOfWork.CourseRepository.GetCourses();

			if (courses == null) return NotFound("Failed to find courses");
			
			return Ok(courses);
		}

		[HttpGet("{id:int}")]
		public async Task<ActionResult<Course>> GetCourse(int id)
		{
			//return Ok(await _unitOfWork.CourseRepository.GetCourse(id));

			var course = await _unitOfWork.CourseRepository.GetCourse(id);

			if (course == null) return NotFound("Failed to find the course");

			return Ok(course);
		}

		[HttpPost]
		public async Task<ActionResult> AddCourseToUser(CourseDto courseDto)
		{
			var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
			if (user == null) return NotFound("User is not exist");

			var course = new Course()
			{
				/*Title = courseDto.Title,
				Description = courseDto.Description,
				Category = courseDto.Category,
				ImageUrl = courseDto.ImageUrl,
				Videos = _mapper.Map<Course>(courseDto).Videos*/
				
			};

			_mapper.Map(courseDto, course);

			_unitOfWork.CourseRepository.AddCourseToUser(course, user);

			if (await _unitOfWork.Complete()) return Ok("The course has been successfully created");

			return BadRequest("Failed to create course");
		}


		[HttpPut]
		public async Task<ActionResult> UpdateCourse(CourseUpdateDto courseUpdateDto)
		{
			var course = await _unitOfWork.CourseRepository.GetCourse(courseUpdateDto.Id);

			if (course == null) return NotFound("Failed to find course");

			_mapper.Map(courseUpdateDto, course);

			if (await _unitOfWork.Complete()) return NoContent();

			return BadRequest("Failed to update course");
		}

		[HttpDelete("delete-course/{courseId:int}")]
		public async Task<ActionResult> DeleteCourse(int courseId)
		{
			var courseDto = await _unitOfWork.CourseRepository.GetCourse(courseId);

			if (courseDto == null) return NotFound();

			 _unitOfWork.CourseRepository.DeleteCourse(_mapper.Map<Course>(courseDto));

			 if (await _unitOfWork.Complete()) return Ok();

			 return BadRequest("Failed to delete course");

		}
	}
}
