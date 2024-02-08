import { IncomingMessage, ServerResponse } from 'http';
import { UsersController } from '../users/controller';
import { UsersRepository } from '../users/repository';
import { UsersService } from '../users/service';

export const router = (req: IncomingMessage, res: ServerResponse) => {
  const usersRepository = new UsersRepository([])
  const usersService = new UsersService(usersRepository)
  const usersController = new UsersController(usersService)
    const { url, method } = req;

    switch (method) {
        case 'GET':
            if (url === '/api/users') {
                usersController.getAllUsers(req, res);
            } else if( url === 'api/users/{userId}') {
              
            }
            break;
        // case 'POST':
        //     if (url === '/api/users') {
        //         usersController.createUser(req, res);
        //     } else {
        //     }
        //     break;
        default:
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Not Found' }));
    }
};
