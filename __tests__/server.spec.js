const request = require('supertest');
const app = require('../src/app');

const get = (url = '/') => request(app).get(url).send();

describe('App', () => {
  describe('File do not exist', () => {
    let response;
    beforeEach(async () => {
      response = await get('/invalid.index');
    });

    it('should return 404 http status code', () => {
      expect(response.statusCode).toBe(404);
    });

    it('should write text/plain as context type', () => {
      const contentType = { 'Content-Type': 'text/plain' };
      expect(response.headers['content-type']).toBe(
        contentType['Content-Type']
      );
    });

    it('should "Error 404: resource not found." error message', () => {
      expect(response.error.text).toBe('Error 404: resource not found.');
    });
  });

  describe('File exist', () => {
    let response;
    beforeEach(async () => {
      response = await get();
    });

    it('should return 200 ok http status code', () => {
      expect(response.statusCode).toBe(200);
    });

    it('should write text/html as context type', () => {
      const contentType = { 'Content-Type': 'text/html' };
      expect(response.headers['content-type']).toBe(
        contentType['Content-Type']
      );
    });
  });
});

console.error = () => {};
