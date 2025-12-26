import supertest from 'supertest';
import app from '../../src/index';

const server = supertest(app);

describe('GET /health', () => {
  it('should return 200 and "I\'m okay!" message', async () => {
    const response = await server.get('/health');
    expect(response.status).toBe(200);
    expect(response.text).toBe("I'm okay!");
  });
});


