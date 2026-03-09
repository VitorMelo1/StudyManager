const UserRepository = require('../../repositories/UserRepository');

class ListUsersService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute() {
    const users = await this.userRepository.findAll();
    return users;
  }
}

module.exports = ListUsersService;

