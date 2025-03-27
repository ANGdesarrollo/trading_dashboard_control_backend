// src/Symbol/Application/index.ts
import { CreateSymbolUseCase } from './CreateSymbolUseCase';
import { DeleteSymbolUseCase } from './DeleteSymbolUseCase';
import { GetSymbolByIdUseCase } from './GetSymbolByIdUseCase';
import { ListSymbolUseCase } from './ListSymbolUseCase';
import { UpdateSymbolUseCase } from './UpdateSymbolUseCase';

export const SymbolUseCases = [
  CreateSymbolUseCase,
  ListSymbolUseCase,
  GetSymbolByIdUseCase,
  UpdateSymbolUseCase,
  DeleteSymbolUseCase
];
