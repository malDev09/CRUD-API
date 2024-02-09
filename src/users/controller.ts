import { IncomingMessage, ServerResponse } from 'http';
import { sendErrorResponse, sendSuccessResponse, uuidRegex } from '../helpers';
import { UsersService } from "./service";


export class UsersController {
  constructor(private usersService: UsersService){}


  async getAllUsers  (req: IncomingMessage, res: ServerResponse){
    try {
      const users = await this.usersService.getAll();
      sendSuccessResponse(res, 200, users)

  } catch (error) {
      sendErrorResponse(res, 500, 'Internal Server Error');
  }
  };

  async getUserById(req: IncomingMessage, res: ServerResponse) {
    if (!req.url) {
      sendErrorResponse(res, 400, 'URL is not defined ');
      return;
    }
    const url = new URL(req.url, `http://${req.headers.host}`);
    const userId = url.pathname.substring(url.pathname.lastIndexOf('/') + 1);
    if (!userId || !uuidRegex.test(userId) ) {
      sendErrorResponse(res, 400, 'Invalid userId');
      return;
  }
    try {
        const user = await this.usersService.getUserById(userId);
        sendSuccessResponse(res, 200, user)
    } catch (error) {
      sendErrorResponse(res, 404, 'User not found');
    }
}


  async createUser(req: IncomingMessage, res: ServerResponse) {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            const newUser: User = JSON.parse(body);
            const createdUser = await this.usersService.createUser(newUser);
            
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(createdUser));
        } catch (error) {
          sendErrorResponse(res, 400, 'Invalid request body');
        }
    });
}
async updateUser(req: IncomingMessage, res: ServerResponse) {
  if (!req.url) {
      sendErrorResponse(res, 400, 'URL is not defined');
      return;
  }
  const url = new URL(req.url, `http://${req.headers.host}`);
  const userId = url.pathname.substring(url.pathname.lastIndexOf('/') + 1);

  if (!userId || !uuidRegex.test(userId)) {
      sendErrorResponse(res, 400, 'Invalid userId');
      return;
  }

  try {
      const updatedUser = await this.usersService.updateUser(userId, req);
      sendSuccessResponse(res, 200, updatedUser);
  } catch (error) {
      sendErrorResponse(res, 404, 'User not found');
  }
}

async deleteUser(req: IncomingMessage, res: ServerResponse) {
  if (!req.url) {
      sendErrorResponse(res, 400, 'URL is not defined');
      return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const userId = url.pathname.substring(url.pathname.lastIndexOf('/') + 1);

  if (!userId || !uuidRegex.test(userId)) {
      sendErrorResponse(res, 400, 'Invalid userId');
      return;
  }

  try {
      await this.usersService.deleteUser(userId);
      sendSuccessResponse(res, 204);
  } catch (error) {
      sendErrorResponse(res, 404, 'User not found');
  }
}

}

