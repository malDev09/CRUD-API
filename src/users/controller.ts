import { IncomingMessage, ServerResponse } from 'http';
import { UsersService } from "./service";


export class UsersController {
  constructor(private usersService: UsersService){}


  async getAllUsers  (req: IncomingMessage, res: ServerResponse){
    const users = await this.usersService.getAll();
    res.end(JSON.stringify(users));
  };

  async getUserById  (req: IncomingMessage, res: ServerResponse){
    if (!req.url) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'URL is not defined' }));
      return;
  }
  const url = new URL(req.url, `http://${req.headers.host}`);

  const userId = url.pathname.split('/').pop();
    const user = await this.usersService.getUserById(userId)
    res.end(JSON.stringify(user))
  }

 async createUser (req: IncomingMessage, res: ServerResponse) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        let newUser: User = JSON.parse(body);
        users.push(newUser);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
    });
};

}