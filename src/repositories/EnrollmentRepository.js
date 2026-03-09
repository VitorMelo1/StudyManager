const prisma = require('../infra/database/prismaClient');

class EnrollmentRepository {
  async create(data) {
    return prisma.enrollment.create({ data });
  }

  async findByUserAndCourse(userId, courseId) {
    return prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });
  }
}

module.exports = EnrollmentRepository;

