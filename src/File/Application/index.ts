// src/File/Application/index.ts
import { DeleteFileUseCase } from './DeleteFileUseCase';
import { GetFileByIdUseCase } from './GetFileByIdUseCase';
import { ListFileUseCase } from './ListFileUseCase';
import { UpdateFileUseCase } from './UpdateFileUseCase';
import { UploadFileUseCase } from './UploadFileUseCase';

export const StorageUseCases = [
  ListFileUseCase,
  GetFileByIdUseCase,
  UpdateFileUseCase,
  DeleteFileUseCase,
  UploadFileUseCase,
  UploadFileUseCase
];
