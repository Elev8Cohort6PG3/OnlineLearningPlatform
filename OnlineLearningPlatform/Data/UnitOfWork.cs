using AutoMapper;
using OnlineLearningPlatform.Interfaces;

namespace OnlineLearningPlatform.Data
{
	public class UnitOfWork : IUnitOfWork
	{
		private readonly DataContext _context;
		private readonly IMapper _mapper;

		public UnitOfWork(DataContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		public IUserRepository UserRepository => new UserRepository(_context, _mapper);
		public ICourseRepository CourseRepository => new CourseRepository(_context, _mapper);
		public IEnrollmentRepository EnrollmentRepository => new EnrollmentRepository(_context, _mapper, CourseRepository);

		public async Task<bool> Complete()
		{
			return await _context.SaveChangesAsync() > 0;
		}

		public bool HasChanges()
		{
			return _context.ChangeTracker.HasChanges();
		}
	}
}
