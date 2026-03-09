const { successResponse } = require('../utils/apiResponse');
const AppError = require('../utils/AppError');

const CreateCourseService = require('../usecases/courses/CreateCourseService');
const ListCoursesService = require('../usecases/courses/ListCoursesService');
const GetCourseByIdService = require('../usecases/courses/GetCourseByIdService');
const UpdateCourseService = require('../usecases/courses/UpdateCourseService');
const DeleteCourseService = require('../usecases/courses/DeleteCourseService');

class CourseController {
  async create(req, res, next) {
    try {
      const { title, description, workload } = req.body;

      const service = new CreateCourseService();
      const course = await service.execute({
        title,
        description,
        workload,
      });

      return successResponse(res, 'Course created successfully', course, 201);
    } catch (error) {
      next(error);
    }
  }

  async list(req, res, next) {
    try {
      const service = new ListCoursesService();
      const courses = await service.execute();

      return successResponse(res, 'Courses retrieved successfully', courses);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        throw new AppError('Invalid course id', 400);
      }

      const service = new GetCourseByIdService();
      const course = await service.execute(id);

      return successResponse(res, 'Course retrieved successfully', course);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        throw new AppError('Invalid course id', 400);
      }

      const { title, description, workload } = req.body;
      const service = new UpdateCourseService();
      const course = await service.execute(id, {
        title,
        description,
        workload,
      });

      return successResponse(res, 'Course updated successfully', course);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        throw new AppError('Invalid course id', 400);
      }

      const service = new DeleteCourseService();
      await service.execute(id);

      return successResponse(res, 'Course deleted successfully', null, 204);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CourseController();

