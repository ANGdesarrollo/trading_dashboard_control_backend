import { BinaryState } from '../../../Shared/Domain/Repositories/BinaryState';

export interface UserDomain {
  id: string;
  username: string;
  password: string;
  roles: string[];
  tenant_id: string[];
  is_admin: BinaryState;
  is_active: BinaryState;
}
