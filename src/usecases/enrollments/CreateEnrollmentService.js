const EnrollmentRepository = require('../../repositories/EnrollmentRepository');
const UserRepository = require('../../repositories/UserRepository');
const CourseRepository = require('../../repositories/CourseRepository');
const AppError = require('../../utils/AppError');

class CreateEnrollmentService {
  constructor() {
    this.enrollmentRepository = new EnrollmentRepository();
    this.userRepository = new UserRepository();
    this.courseRepository = new CourseRepository();
  }

  async execute({ userId, courseId }) {
    if (!userId || !courseId) {
      throw new AppError('userId and courseId are required', 400);
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const course = await this.courseRepository.findById(courseId);
    if (!course) {
      throw new AppError('Course not found', 404);
    }

    const existingEnrollment = await this.enrollmentRepository.findByUserAndCourse(
      userId,
      courseId,
    );

    if (existingEnrollment) {
      throw new AppError('User is already enrolled in this course', 409);
    }

    const enrollment = await this.enrollmentRepository.create({
      userId,
      courseId,
    });

    return enrollment;
  }
}

module.exports = CreateEnrollmentService;

