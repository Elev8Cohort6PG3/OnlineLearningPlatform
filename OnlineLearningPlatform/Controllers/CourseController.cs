using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using OnlineLearningPlatform.DTOs;
using OnlineLearningPlatform.Entities;
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
		public async Task<ActionResult<IEnumerable<CourseDto>>> GetCourses()
		{
			return Ok(await _unitOfWork.CourseRepository.GetCourses());
		}

		[HttpGet("{id:int}")]
		public async Task<ActionResult<CourseDto>> GetCourse(int id)
		{
			return Ok(await _unitOfWork.CourseRepository.GetCourse(id));
		}

		[HttpPost]
		public async Task<ActionResult<CourseDto>> AddCourse(CourseDto courseDto)
		{
			var course = new Course()
			{
				Title = courseDto.Title,
				Description = courseDto.Description,
				Category = courseDto.Category,
				EnrollmentCount = courseDto.EnrollmentCount,
				ImageUrl = courseDto.ImageUrl,
				Videos = new List<Video>()
			};

			_unitOfWork.CourseRepository.AddCourse(course);

			if (await _unitOfWork.Complete()) return Ok(_mapper.Map<CourseDto>(course));

			return BadRequest("Failed to create course");
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
