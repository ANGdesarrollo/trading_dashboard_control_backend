import * as bcrypt from 'bcrypt';

export class HashService
{
  private readonly saltRounds: number;

  constructor(saltRounds = 10)
  {
    this.saltRounds = saltRounds;
  }

  async hash(plainText: string): Promise<string>
  {
    return bcrypt.hash(plainText, this.saltRounds);
  }

  async compare(plainText: string, hash: string): Promise<boolean>
  {
    return bcrypt.compare(plainText, hash);
  }
}
