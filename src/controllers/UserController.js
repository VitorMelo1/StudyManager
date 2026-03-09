const { successResponse } = require('../utils/apiResponse');
const AppError = require('../utils/AppError');

const CreateUserService = require('../usecases/users/CreateUserService');
const ListUsersService = require('../usecases/users/ListUsersService');
const GetUserByIdService = require('../usecases/users/GetUserByIdService');
const UpdateUserService = require('../usecases/users/UpdateUserService');
const DeleteUserService = require('../usecases/users/DeleteUserService');
const GetUserCoursesService = require('../usecases/users/GetUserCoursesService');

class UserController {
  async create(req, res, next) {
    try {
      const { name, email } = req.body;

      const service = new CreateUserService();
      const user = await service.execute({ name, email });

      return successResponse(res, 'User created successfully', user, 201);
    } catch (error) {
      next(error);
    }
  }

  async list(req, res, next) {
    try {
      const service = new ListUsersService();
      const users = await service.execute();

      return successResponse(res, 'Users retrieved successfully', users);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        throw new AppError('Invalid user id', 400);
      }

      const service = new GetUserByIdService();
      const user = await service.execute(id);

      return successResponse(res, 'User retrieved successfully', user);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        throw new AppError('Invalid user id', 400);
      }

      const { name, email } = req.body;
      const service = new UpdateUserService();
      const user = await service.execute(id, { name, email });

      return successResponse(res, 'User updated successfully', user);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        throw new AppError('Invalid user id', 400);
      }

      const service = new DeleteUserService();
      await service.execute(id);

      return successResponse(res, 'User deleted successfully', null, 204);
    } catch (error) {
      next(error);
    }
  }

  async getUserCourses(req, res, next) {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        throw new AppError('Invalid user id', 400);
      }

      const service = new GetUserCoursesService();
      const result = await service.execute(id);

      return successResponse(res, 'User courses retrieved successfully', result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();

