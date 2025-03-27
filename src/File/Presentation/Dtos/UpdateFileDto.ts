import { PartialType } from '@nestjs/mapped-types';

import { FileDto } from './FileDto';

export class UpdateFileDto extends PartialType(FileDto) {}
