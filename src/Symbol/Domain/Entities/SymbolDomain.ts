import { BaseDomain } from '../../../Shared/Domain/Repositories/BaseDomain';

export interface SymbolDomain extends BaseDomain {
  id: string;
  name: string;
}
