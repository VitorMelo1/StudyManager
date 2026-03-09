const prisma = require('../infra/database/prismaClient');

class CourseRepository {
  async create(data) {
    return prisma.course.create({ data });
  }

  async findById(id) {
    return prisma.course.findUnique({ where: { id } });
  }

  async findAll() {
    return prisma.course.findMany();
  }

  async update(id, data) {
    return prisma.course.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return prisma.course.delete({
      where: { id },
    });
  }
}

module.exports = CourseRepository;

