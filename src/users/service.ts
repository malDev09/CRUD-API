import { UsersRepository } from "./repository";

export class UsersService {
  constructor(private usersRepository: UsersRepository){}

  async getAll() {
    return this.usersRepository.getAll();
  }

  async getUserById(id: User["id"]) {
    return this.usersRepository.getById(id)
  }
}