const UserRepository = require('../../repositories/UserRepository');
const AppError = require('../../utils/AppError');

class GetUserByIdService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(id) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
}

module.exports = GetUserByIdService;

