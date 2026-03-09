const CourseRepository = require('../../repositories/CourseRepository');
const AppError = require('../../utils/AppError');

class CreateCourseService {
  constructor() {
    this.courseRepository = new CourseRepository();
  }

  async execute({ title, description, workload }) {
    if (!title || !description || workload == null) {
      throw new AppError('Title, description and workload are required', 400);
    }

    if (typeof workload !== 'number' || workload <= 0) {
      throw new AppError('Workload must be a positive number', 400);
    }

    const course = await this.courseRepository.create({
      title,
      description,
      workload,
    });

    return course;
  }
}

module.exports = CreateCourseService;

