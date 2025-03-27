import { PartialType } from '@nestjs/mapped-types';

import { OperationDto } from './OperationDto';


export class UpdateOperationDto extends PartialType(OperationDto) {}
