const UserRepository = require('../../repositories/UserRepository');
const AppError = require('../../utils/AppError');

class CreateUserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute({ name, email }) {
    if (!name || !email) {
      throw new AppError('Name and email are required', 400);
    }

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError('Email already in use', 409);
    }

    const user = await this.userRepository.create({ name, email });
    return user;
  }
}

module.exports = CreateUserService;

