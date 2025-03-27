import { BaseDomain } from '../../../Shared/Domain/Repositories/BaseDomain';

export interface FileDomain extends BaseDomain {
  id: string;
  fileName: string;
  originalName: string;
  path: string;
  mimeType: string;
  size: number;
  isPublic: boolean;
  url?: string;
}
