import { PartialType } from '@nestjs/mapped-types';

import { StorageDto } from './StorageDto';

export class UpdateStorageDto extends PartialType(StorageDto) {}
