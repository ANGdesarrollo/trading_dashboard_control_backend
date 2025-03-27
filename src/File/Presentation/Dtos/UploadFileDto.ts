import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UploadFileDto
{
  @IsNotEmpty()
    buffer: Buffer;

  @IsString()
  @IsNotEmpty()
    originalName: string;

  @IsString()
  @IsOptional()
    mimeType?: string;

  @IsBoolean()
  @IsOptional()
    isPublic?: boolean = true;
}
