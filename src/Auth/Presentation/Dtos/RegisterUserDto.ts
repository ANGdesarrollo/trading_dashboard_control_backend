import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto
{
  @IsEmail()
  @IsNotEmpty()
    username: string;

  @IsString()
  @IsNotEmpty()
    password: string;
}
