// test/Symbol/Symbol.spec.ts
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import TestAgent from 'supertest/lib/agent';

import { SymbolDto } from '../../src/Symbol/Presentation/Dtos/SymbolDto';
import { SymbolModule } from '../../src/Symbol/SymbolModule';
import { getTestAgent } from '../TestAgent';

let agent: TestAgent;
let app: NestFastifyApplication;
let symbolId: string;
let symbolData: SymbolDto;

describe('Symbol E2E', () => {
  beforeAll(async() => {
    const testAgent = await getTestAgent(SymbolModule);
    agent = testAgent.agent;
    app = testAgent.app;
  });

  afterAll(async() => {
    await app.close();
  });

  describe('Create Symbol', () => {
    it('POST /symbol', async() => {
      symbolData = {
        exampleField: 'Example value'
        // Add test data for your entity
      };

      const response = await agent.post('/api/symbol').send(symbolData);
      symbolId = response.body.id;

      expect(response.status).toBe(201);
      expect(response.body.exampleField).toBe(symbolData.exampleField);
    });
  });

  describe('Get Symbol', () => {
    it('GET /symbol', async() => {
      const response = await agent.get('/api/symbol');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('GET /symbol/:id', async() => {
      const response = await agent.get(`/api/symbol/${symbolId}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(symbolId);
      expect(response.body.exampleField).toBe(symbolData.exampleField);
    });
  });

  describe('Update Symbol', () => {
    it('PUT /symbol/:id', async() => {
      const updateData = {
        exampleField: 'Updated value'
      };

      const response = await agent.put(`/api/symbol/${symbolId}`).send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.exampleField).toBe(updateData.exampleField);
    });
  });

  describe('Delete Symbol', () => {
    it('DELETE /symbol/:id', async() => {
      const response = await agent.delete(`/api/symbol/${symbolId}`);

      expect(response.status).toBe(204);

      // Verify it's deleted
      const getResponse = await agent.get(`/api/symbol/${symbolId}`);
      expect(getResponse.status).toBe(404);
    });
  });
});
