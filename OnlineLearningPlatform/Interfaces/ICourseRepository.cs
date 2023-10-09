using System.Collections;
using OnlineLearningPlatform.DTOs;
using OnlineLearningPlatform.Entities;

namespace OnlineLearningPlatform.Interfaces
{
	public interface ICourseRepository
	{
		void AddCourseToUser(Course course, AppUser appUser);
		void DeleteCourse(Course course);
		//Task<Course> UpdateCourse(CourseUpdateDto courseUpdateDto);
		Task<CourseWithUserAndVideoDto> GetCourse(int id);
		Task<IEnumerable<CourseWithUserAndVideoDto>> GetCourses();

	}
}
