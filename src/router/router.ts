import { IncomingMessage, ServerResponse } from 'http';
import { sendErrorResponse } from '../helpers';
import { UsersController } from '../users/controller';
import { UsersRepository } from '../users/repository';
import { UsersService } from '../users/service';

const usersRepository = new UsersRepository([])
const usersService = new UsersService(usersRepository)
const usersController = new UsersController(usersService)

export const router = (req: IncomingMessage, res: ServerResponse) => {

    const { url, method } = req;
    const URL = /^\/api\/users\/?$/;
    const URL_ID = /^\/api\/users\/[^\/]+$/;

    switch (method) {
        case 'GET':
            if (url?.match(URL)) {
                usersController.getAllUsers(req, res);
            } 
             if( url?.match(URL_ID)) {
              usersController.getUserById(req, res)
            }
            break;
        case 'POST':
            if (url?.match(URL)) {
                usersController.createUser(req, res);
            } 
            break;
        case 'PUT':
              if (url?.match(URL_ID)) {
                  usersController.updateUser(req, res);
              }
              break;
        case 'DELETE':
              if (url?.match(URL_ID)) {
                  usersController.deleteUser(req, res);
              }
              break;
        default:
          sendErrorResponse(res, 404, 'Page not found')
    }
};
