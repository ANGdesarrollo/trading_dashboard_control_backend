import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class FileDto
{
  @IsString()
  @IsNotEmpty()
    fileName: string;

  @IsString()
  @IsNotEmpty()
    originalName: string;

  @IsString()
  @IsNotEmpty()
    path: string;

  @IsString()
  @IsNotEmpty()
    mimeType: string;

  @IsNumber()
  @IsNotEmpty()
    size: number;

  @IsBoolean()
  @IsOptional()
    isPublic?: boolean = true;

  @IsUrl()
  @IsOptional()
    url?: string;
}
