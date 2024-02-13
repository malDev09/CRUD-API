import request from "supertest";
import { v4 as uuid } from "uuid";
import { server } from "../src/index";
import { User } from "../src/types";

describe('API Tests', () => {

  afterAll((done) => {
    server.close();
    done();
  })

    describe("valid data", () => {
      let userId = uuid();

      test('GET /api/users - should return an empty array', async () => {
        const response = await request(server).get('/api/users');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]);
      });
    
      test('POST /api/users - should create a new user', async () => {
        const newUser: User = {         
        username: "Ben",
        age: 33,
        hobbies: ["coding", "debugging"], };
        const response = await request(server).post('/api/users').send(newUser);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        userId = response.body.id;
      });
    
      test('GET /api/users/:userId - should return the created user', async () => {
        const response = await request(server).get(`/api/users/${userId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id', userId);
      });
    
      test('PUT /api/users/:userId - should update the created user', async () => {
        const updatedUser: User = {     
        username: "Bennni",
        age: 34,
        hobbies: ["chill"], };
        const response = await request(server).put(`/api/users/${userId}`).send(updatedUser);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.objectContaining(updatedUser));
      });
    
      test('DELETE /api/users/:userId - should delete the created user', async () => {
        const response = await request(server).delete(`/api/users/${userId}`);
        expect(response.statusCode).toBe(204);
      });
    
      test('GET /api/users/:userId - should return 404 for the deleted user', async () => {
        const response = await request(server).get(`/api/users/${userId}`);
        expect(response.statusCode).toBe(404);
      });
    })

    describe("invalid data", () => {
      let userId = 'invalid';

      test('POST /api/users - should return an error for creating a user with invalid data', async () => {
        const invalidUser = {
          username: "John",
          age: "123",
          hobbies: [],
        };
        const response = await request(server).post('/api/users').send(invalidUser);
        expect(response.statusCode).toBe(400);
      });
      
      test('PUT /api/users/:userId - should return an error for updating a user with invalid data', async () => {
        const invalidUser = {
          username: "Name",
          age: 12,
          hobbies: ["Hobby"],
        };
        const response = await request(server).put(`/api/users/${userId}`).send(invalidUser);
        expect(response.statusCode).toBe(400);
      });
      
      test('GET /api/users/:userId - should return 400 for getting user with invalid ID', async () => {
        const invalidUserId = "invalidId";
        const response = await request(server).get(`/api/users/${invalidUserId}`);
        expect(response.statusCode).toBe(400);
      });
      
      test('PUT /api/users/:userId - should return 400 for updating user with invalid ID', async () => {
        const invalidUserId = "invalidId";
        const response = await request(server).put(`/api/users/${invalidUserId}`).send({ username: "InvalidName" });
        expect(response.statusCode).toBe(400);
      });
      
      test('DELETE /api/users/:userId - should return 400 for deleting user with invalid ID', async () => {
        const invalidUserId = "invalidId";
        const response = await request(server).delete(`/api/users/${invalidUserId}`);
        expect(response.statusCode).toBe(400);
      });
      
    })

    describe("invalid data 2", () => {
      let userId = uuid();
      let userIdNotExist = uuid();


      test('POST /api/users - should create a new user', async () => {
        const newUser: User = {         
        username: "Ben",
        age: 33,
        hobbies: ["coding", "debugging"], };
        const response = await request(server).post('/api/users').send(newUser);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        userId = response.body.id;
      });
      
      test('PUT /api/users/:userId - should return an error 404 for updating a user that doesnt exist', async () => {
        const invalidUser = {
          username: "Name",
          age: 12,
          hobbies: ["Hobby"],
        };
        const response = await request(server).put(`/api/users/${userIdNotExist}`).send(invalidUser);
        expect(response.statusCode).toBe(404);
      });
      
      test('GET /api/users/:userId - should return 404 for getting user that doesnt exist', async () => {
        const response = await request(server).get(`/api/users/${userIdNotExist}`);
        expect(response.statusCode).toBe(404);
      });
      
      test('PUT /api/users/:userId - should return 404 for updating user that doesnt exist', async () => {
        const response = await request(server).put(`/api/users/${userIdNotExist}`).send({ username: "InvalidName" });
        expect(response.statusCode).toBe(404);
      });
      
      test('DELETE /api/users/:userId - should return 404 for deleting user that doesnt exist', async () => {
        const response = await request(server).delete(`/api/users/${userIdNotExist}`);
        expect(response.statusCode).toBe(404);
      });
      
    })
});
