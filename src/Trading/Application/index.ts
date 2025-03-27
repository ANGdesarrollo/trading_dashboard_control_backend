// src/Trading/Application/index.ts
import { CreateTradingUseCase } from './CreateTradingUseCase';
import { DeleteTradingUseCase } from './DeleteTradingUseCase';
import { GetTradingByIdUseCase } from './GetTradingByIdUseCase';
import { ListTradingUseCase } from './ListTradingUseCase';
import { UpdateTradingUseCase } from './UpdateTradingUseCase';

export const TradingUseCases = [
  CreateTradingUseCase,
  ListTradingUseCase,
  GetTradingByIdUseCase,
  UpdateTradingUseCase,
  DeleteTradingUseCase
];
