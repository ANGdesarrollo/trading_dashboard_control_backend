import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';

import { UploadFileUseCase } from '../../Application/UploadFileUseCase';
import { FileDomain } from '../../Domain/Entities/FileDomain';
import { UploadFileDto } from '../Dtos/UploadFileDto';

@Controller('file')
export class PostController
{
  constructor(
    private readonly uploadFileUseCase: UploadFileUseCase
  ) {}

  @Post('upload')
  @HttpCode(HttpStatus.CREATED)
  async uploadFile(
    @Req() request: FastifyRequest,
    @Body('isPublic') isPublic?: string
  ): Promise<FileDomain>
  {
    const data = await request.file({
      limits: {
        fileSize: 10 * 1024 * 1024
      }
    });

    if (!data)
    {
      throw new Error('No file uploaded');
    }

    const buffer = await data.toBuffer();

    const uploadDto: UploadFileDto = {
      buffer,
      originalName: data.filename,
      mimeType: data.mimetype,
      isPublic: isPublic !== 'false'
    };

    return this.uploadFileUseCase.execute(uploadDto);
  }
}
