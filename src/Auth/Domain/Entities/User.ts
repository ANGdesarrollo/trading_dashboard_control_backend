import { BinaryState } from '../../../Shared/Domain/Repositories/BinaryState';

export class User
{
  public id: string;
  public username: string;
  public password: string;
  public roles: string[];
  public tenant_id: string[];
  public is_admin: BinaryState;
  public is_active: BinaryState;

  constructor(
    id: string,
    username: string,
    password: string,
    roles: string[],
    tenant_id: string[],
    is_admin: BinaryState,
    is_active: BinaryState
  )
  {
    this.id = id;
    this.username = username;
    this.password = password;
    this.roles = roles;
    this.tenant_id = tenant_id;
    this.is_admin = is_admin;
    this.is_active = is_active;
  }
}
