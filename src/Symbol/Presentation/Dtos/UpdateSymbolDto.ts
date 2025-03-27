import { PartialType } from '@nestjs/mapped-types';

import { SymbolDto } from './SymbolDto';

export class UpdateSymbolDto extends PartialType(SymbolDto) {}
