import { IncomingMessage, ServerResponse } from "http";

export function sendErrorResponse(res: ServerResponse, statusCode: number, message: string) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message }));
}

export function sendSuccessResponse(res: ServerResponse, statusCode: number, user?:object, users?: object[]) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(user ? user : users));
}

export function getBody(req: IncomingMessage): Promise<User> {
  return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', chunk => {
          body += chunk.toString();
      });
      req.on('end', () => {
          try {
              const parsedBody: User = JSON.parse(body);
              resolve(parsedBody);
          } catch (error) {
              reject(error);
          }
      });
  });
}


export const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
