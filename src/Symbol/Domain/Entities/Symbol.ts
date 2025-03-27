export class Symbol
{
  public id: string;
  public name: string;
  public created_at?: Date;
  public updated_at?: Date;

  constructor(id: string, name: string, created_at?: Date, updated_at?: Date)
{
    this.id = id;
    this.name = name;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
