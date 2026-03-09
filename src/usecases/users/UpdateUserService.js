const UserRepository = require('../../repositories/UserRepository');
const AppError = require('../../utils/AppError');

class UpdateUserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(id, { name, email }) {
    if (!name && !email) {
      throw new AppError('At least one field (name or email) must be provided', 400);
    }

    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new AppError('User not found', 404);
    }

    if (email && email !== existingUser.email) {
      const userWithSameEmail = await this.userRepository.findByEmail(email);
      if (userWithSameEmail) {
        throw new AppError('Email already in use', 409);
      }
    }

    const updatedUser = await this.userRepository.update(id, {
      name: name ?? existingUser.name,
      email: email ?? existingUser.email,
    });

    return updatedUser;
  }
}

module.exports = UpdateUserService;

