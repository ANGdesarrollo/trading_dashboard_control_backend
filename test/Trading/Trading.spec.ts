// test/Trading/Trading.spec.ts
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import TestAgent from 'supertest/lib/agent';

import { Result, TradeType } from '../../src/Trading/Domain/Entities/TradingDomain';
import { TradingDto } from '../../src/Trading/Presentation/Dtos/TradingDto';
import { TradingModule } from '../../src/Trading/TradingModule';
import { getTestAgent } from '../TestAgent';

let agent: TestAgent;
let app: NestFastifyApplication;
let tradingId: string;
let tradingData: TradingDto;

describe('Trading E2E', () =>
{
  beforeAll(async() =>
  {
    const testAgent = await getTestAgent(TradingModule);
    agent = testAgent.agent;
    app = testAgent.app;
  });

  afterAll(async() =>
  {
    await app.close();
  });

  describe('Create Trading', () =>
  {
    it('POST /trading', async() =>
    {
      tradingData = {
        symbol: 'EURUSD',
        type: TradeType.LONG,
        pips: 150,
        imagePath: '/path/to/image.jpg',
        result: Result.WON,
        description: 'This was a great trade based on fundamental analysis',
        date: new Date()
      };

      const response = await agent.post('/api/trading').send(tradingData);
      tradingId = response.body.id;

      expect(response.status).toBe(201);
      expect(response.body.symbol).toBe(tradingData.symbol);
    });
  });

  describe('Get Trading', () =>
  {
    it('GET /trading', async() =>
    {
      const response = await agent.get('/api/trading');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('GET /trading/:id', async() =>
  {
      const response = await agent.get(`/api/trading/${tradingId}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(tradingId);
      expect(response.body.symbol).toBe(tradingData.symbol);
    });
  });

  describe('Update Trading', () =>
  {
    it('PUT /trading/:id', async() =>
  {
      const updateData = {
        pips: 200,
        description: 'Updated description'
      };

      const response = await agent.put(`/api/trading/${tradingId}`).send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.pips).toBe(updateData.pips);
      expect(response.body.description).toBe(updateData.description);
    });
  });

  describe('Delete Trading', () =>
  {
    it('DELETE /trading/:id', async() =>
    {
      const response = await agent.delete(`/api/trading/${tradingId}`);

      expect(response.status).toBe(204);

      // Verify it's deleted
      const getResponse = await agent.get(`/api/trading/${tradingId}`);
      expect(getResponse.status).toBe(404);
    });
  });
});
