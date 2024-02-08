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

}