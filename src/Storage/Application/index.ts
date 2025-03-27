// src/Storage/Application/index.ts
import { CreateStorageUseCase } from './CreateStorageUseCase';
import { DeleteStorageUseCase } from './DeleteStorageUseCase';
import { GetStorageByIdUseCase } from './GetStorageByIdUseCase';
import { ListStorageUseCase } from './ListStorageUseCase';
import { UpdateStorageUseCase } from './UpdateStorageUseCase';

export const StorageUseCases = [
  CreateStorageUseCase,
  ListStorageUseCase,
  GetStorageByIdUseCase,
  UpdateStorageUseCase,
  DeleteStorageUseCase
];
