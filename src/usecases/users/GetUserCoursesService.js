const UserRepository = require('../../repositories/UserRepository');
const AppError = require('../../utils/AppError');

class GetUserCoursesService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(id) {
    const userWithCourses = await this.userRepository.findUserWithCourses(id);

    if (!userWithCourses) {
      throw new AppError('User not found', 404);
    }

    const courses = userWithCourses.enrollments.map((enrollment) => enrollment.course);

    return {
      user: {
        id: userWithCourses.id,
        name: userWithCourses.name,
        email: userWithCourses.email,
      },
      courses,
    };
  }
}

module.exports = GetUserCoursesService;

