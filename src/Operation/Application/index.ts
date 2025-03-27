// src/Operation/Application/index.ts
import { CreateOperationUseCase } from './CreateOperationUseCase';
import { DeleteOperationUseCase } from './DeleteOperationUseCase';
import { GetOperationByIdUseCase } from './GetOperationByIdUseCase';
import { ListOperationUseCase } from './ListOperationUseCase';
import { UpdateOperationUseCase } from './UpdateOperationUseCase';

export const TradingUseCases = [
  CreateOperationUseCase,
  ListOperationUseCase,
  GetOperationByIdUseCase,
  UpdateOperationUseCase,
  DeleteOperationUseCase
];
