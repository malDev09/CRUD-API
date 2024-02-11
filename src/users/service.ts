import { IncomingMessage } from 'http';
import { getBody } from '../helpers';
import { User } from '../types';
import { UsersRepository } from './repository';

export class UsersService {
    constructor(private usersRepository: UsersRepository) {}

    async getAll(): Promise<User[]> {
        return this.usersRepository.getAll();
    }

    async getUserById(id: User["id"]): Promise<User | undefined> {
        return this.usersRepository.getById(id);
    }

    async createUser(newUser: User): Promise<User> {
        return this.usersRepository.create(newUser);
    }
    async updateUser(userId: string, req: IncomingMessage): Promise<User> {
      const body = await getBody(req);
      const updatedUser = await this.usersRepository.update(userId, body);
      return updatedUser;
  }

  async deleteUser(userId: string): Promise<void> {
      await this.usersRepository.delete(userId);
  }

}

