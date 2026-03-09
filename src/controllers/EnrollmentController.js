const { successResponse } = require('../utils/apiResponse');
const AppError = require('../utils/AppError');
const CreateEnrollmentService = require('../usecases/enrollments/CreateEnrollmentService');

class EnrollmentController {
  async create(req, res, next) {
    try {
      const { userId, courseId } = req.body;

      const parsedUserId = Number(userId);
      const parsedCourseId = Number(courseId);

      if (
        !Number.isInteger(parsedUserId) ||
        parsedUserId <= 0 ||
        !Number.isInteger(parsedCourseId) ||
        parsedCourseId <= 0
      ) {
        throw new AppError('userId and courseId must be positive integers', 400);
      }

      const service = new CreateEnrollmentService();
      const enrollment = await service.execute({
        userId: parsedUserId,
        courseId: parsedCourseId,
      });

      return successResponse(res, 'Enrollment created successfully', enrollment, 201);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new EnrollmentController();

