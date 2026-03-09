const UserRepository = require('../../repositories/UserRepository');
const AppError = require('../../utils/AppError');

class DeleteUserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(id) {
    const existingUser = await this.userRepository.findById(id);

    if (!existingUser) {
      throw new AppError('User not found', 404);
    }

    await this.userRepository.delete(id);

    return null;
  }
}

module.exports = DeleteUserService;

