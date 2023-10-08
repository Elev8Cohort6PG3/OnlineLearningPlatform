using OnlineLearningPlatform.DTOs;
using OnlineLearningPlatform.Entities;

namespace OnlineLearningPlatform.Interfaces
{
	public interface ICourseRepository
	{
		void AddCourse(Course course);
		void DeleteCourse(Course course);
		Task<CourseDto> GetCourse(int id);
		Task<IEnumerable<CourseDto>> GetCourses();

	}
}
