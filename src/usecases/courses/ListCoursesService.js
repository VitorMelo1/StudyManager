const CourseRepository = require('../../repositories/CourseRepository');

class ListCoursesService {
  constructor() {
    this.courseRepository = new CourseRepository();
  }

  async execute() {
    const courses = await this.courseRepository.findAll();
    return courses;
  }
}

module.exports = ListCoursesService;

