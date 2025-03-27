// test/File/File.spec.ts
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import TestAgent from 'supertest/lib/agent';

import { FileModule } from '../../src/File/FileModule';
import { FileDto } from '../../src/File/Presentation/Dtos/FileDto';
import { getTestAgent } from '../TestAgent';

let agent: TestAgent;
let app: NestFastifyApplication;
let storageId: string;
let storageData: FileDto;

describe('File E2E', () =>
{
  beforeAll(async() =>
  {
    const testAgent = await getTestAgent(FileModule);
    agent = testAgent.agent;
    app = testAgent.app;
  });

  afterAll(async() =>
  {
    await app.close();
  });

  describe('Create File', () =>
  {
    it('POST /storage', async() =>
    {
      storageData = {
        exampleField: 'Example value'
        // Add test data for your entity
      };

      const response = await agent.post('/api/storage').send(storageData);
      storageId = response.body.id;

      expect(response.status).toBe(201);
      expect(response.body.exampleField).toBe(storageData.exampleField);
    });
  });

  describe('Get File', () =>
  {
    it('GET /storage', async() =>
    {
      const response = await agent.get('/api/storage');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('GET /storage/:id', async() =>
    {
      const response = await agent.get(`/api/storage/${storageId}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(storageId);
      expect(response.body.exampleField).toBe(storageData.exampleField);
    });
  });

  describe('Update File', () =>
  {
    it('PUT /storage/:id', async() =>
    {
      const updateData = {
        exampleField: 'Updated value'
      };

      const response = await agent.put(`/api/storage/${storageId}`).send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.exampleField).toBe(updateData.exampleField);
    });
  });

  describe('Delete File', () =>
  {
    it('DELETE /storage/:id', async() =>
    {
      const response = await agent.delete(`/api/storage/${storageId}`);

      expect(response.status).toBe(204);

      // Verify it's deleted
      const getResponse = await agent.get(`/api/storage/${storageId}`);
      expect(getResponse.status).toBe(404);
    });
  });
});
