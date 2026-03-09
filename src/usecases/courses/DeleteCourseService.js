const CourseRepository = require('../../repositories/CourseRepository');
const AppError = require('../../utils/AppError');

class DeleteCourseService {
  constructor() {
    this.courseRepository = new CourseRepository();
  }

  async execute(id) {
    const existingCourse = await this.courseRepository.findById(id);

    if (!existingCourse) {
      throw new AppError('Course not found', 404);
    }

    await this.courseRepository.delete(id);

    return null;
  }
}

module.exports = DeleteCourseService;

