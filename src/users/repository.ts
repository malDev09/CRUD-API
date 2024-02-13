import { v4 as uuid } from "uuid";
import { User } from "../types";

export class UsersRepository {
  constructor(private users: User[]){}

  async getAll(): Promise<User[]> {
    return new Promise((resolve) => {
      resolve(this.users);
    });
  }
  async getById(id: User["id"]): Promise<User> {
    return new Promise((resolve, reject) => {
      const user = this.users.find((user) => user.id === id);
      if (user) {
        resolve(user);
      }
      reject('error - user not found');
    });
  }

  async create(user: User): Promise<User> {
    return new Promise((resolve) => {
      const newUser = { ...user, id: uuid() };
      this.users.push(newUser);
      resolve(newUser);
    });
  }

  async update(id: string, data: User): Promise<User> {
    return new Promise((resolve, reject) => {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.users[index] = { ...this.users[index], ...data };
            resolve(this.users[index]);
        } else {
            reject('error - user not found');
        }
    });
}

async delete(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.users.splice(index, 1);
            resolve();
        } else {
            reject('error - user not found');
        }
    });
}
}
