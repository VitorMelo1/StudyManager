const CourseRepository = require('../../repositories/CourseRepository');
const AppError = require('../../utils/AppError');

class GetCourseByIdService {
  constructor() {
    this.courseRepository = new CourseRepository();
  }

  async execute(id) {
    const course = await this.courseRepository.findById(id);

    if (!course) {
      throw new AppError('Course not found', 404);
    }

    return course;
  }
}

module.exports = GetCourseByIdService;

