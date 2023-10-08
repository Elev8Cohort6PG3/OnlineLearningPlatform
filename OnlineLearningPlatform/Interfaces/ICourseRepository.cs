using OnlineLearningPlatform.DTOs;
using OnlineLearningPlatform.Entities;

namespace OnlineLearningPlatform.Interfaces
{
	public interface ICourseRepository
	{
		void AddCourseToUser(Course course, AppUser appUser);
		void DeleteCourse(Course course);
		void UpdateCourse(Course course);
		Task<CourseDto> GetCourse(int id);
		Task<IEnumerable<CourseDto>> GetCourses();

	}
}
