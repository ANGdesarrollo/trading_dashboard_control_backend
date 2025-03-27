// test/Testito/Testito.spec.ts
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import TestAgent from 'supertest/lib/agent';

import { TestitoDto } from '../../src/Testito/Presentation/Dtos/TestitoDto';
import { TestitoModule } from '../../src/Testito/TestitoModule';
import { getTestAgent } from '../TestAgent';

let agent: TestAgent;
let app: NestFastifyApplication;
let testitoId: string;
let testitoData: TestitoDto;

describe('Testito E2E', () => {
  beforeAll(async() => {
    const testAgent = await getTestAgent(TestitoModule);
    agent = testAgent.agent;
    app = testAgent.app;
  });

  afterAll(async() => {
    await app.close();
  });

  describe('Create Testito', () => {
    it('POST /testito', async() => {
      testitoData = {
        exampleField: 'Example value'
        // Add test data for your entity
      };

      const response = await agent.post('/api/testito').send(testitoData);
      testitoId = response.body.id;

      expect(response.status).toBe(201);
      expect(response.body.exampleField).toBe(testitoData.exampleField);
    });
  });

  describe('Get Testito', () => {
    it('GET /testito', async() => {
      const response = await agent.get('/api/testito');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('GET /testito/:id', async() => {
      const response = await agent.get(`/api/testito/${testitoId}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(testitoId);
      expect(response.body.exampleField).toBe(testitoData.exampleField);
    });
  });

  describe('Update Testito', () => {
    it('PUT /testito/:id', async() => {
      const updateData = {
        exampleField: 'Updated value'
      };

      const response = await agent.put(`/api/testito/${testitoId}`).send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.exampleField).toBe(updateData.exampleField);
    });
  });

  describe('Delete Testito', () => {
    it('DELETE /testito/:id', async() => {
      const response = await agent.delete(`/api/testito/${testitoId}`);

      expect(response.status).toBe(204);

      // Verify it's deleted
      const getResponse = await agent.get(`/api/testito/${testitoId}`);
      expect(getResponse.status).toBe(404);
    });
  });
});
