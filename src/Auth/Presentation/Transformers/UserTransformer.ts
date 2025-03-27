import { UserDomain } from '../../Domain/Entities/UserDomain';

export class UserTransformer
{
  private readonly username: string;
  private readonly is_active: number;
  private readonly is_admin: number;

  constructor(payload: UserDomain)
  {
    this.username = payload.username;
    this.is_active = payload.is_active;
    this.is_admin = payload.is_admin;
  }
}
