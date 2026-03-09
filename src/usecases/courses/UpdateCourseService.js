const CourseRepository = require('../../repositories/CourseRepository');
const AppError = require('../../utils/AppError');

class UpdateCourseService {
  constructor() {
    this.courseRepository = new CourseRepository();
  }

  async execute(id, { title, description, workload }) {
    if (!title && !description && workload == null) {
      throw new AppError('At least one field must be provided', 400);
    }

    const existingCourse = await this.courseRepository.findById(id);

    if (!existingCourse) {
      throw new AppError('Course not found', 404);
    }

    const updatedCourse = await this.courseRepository.update(id, {
      title: title ?? existingCourse.title,
      description: description ?? existingCourse.description,
      workload: workload ?? existingCourse.workload,
    });

    return updatedCourse;
  }
}

module.exports = UpdateCourseService;

