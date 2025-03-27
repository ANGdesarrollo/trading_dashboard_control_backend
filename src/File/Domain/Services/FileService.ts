import { randomUUID } from 'crypto';
import * as path from 'path';

import { Injectable } from '@nestjs/common';
import * as mime from 'mime-types';


@Injectable()
export class FileService
{
  generateFileName(originalName: string): string
  {
    const fileExtension = path.extname(originalName);
    const uniqueId = randomUUID();
    return `${uniqueId}${fileExtension}`;
  }

  getFilePath(folder: string, fileName: string): string
  {
    return `${folder}/${fileName}`;
  }

  detectMimeType(fileName: string, fallbackMimeType?: string): string
  {
    // Utiliza la librería mime-types para detectar el tipo MIME
    const mimeType = mime.lookup(fileName);

    // Si no se puede determinar, usa el fallback o 'application/octet-stream'
    if (!mimeType)
    {
      return fallbackMimeType || 'application/octet-stream';
    }

    return mimeType;
  }

  /**
   * Detecta el tipo MIME a partir del contenido del buffer
   * Nota: Para una detección más precisa basada en la firma del archivo,
   * se podría usar una librería como 'file-type', que analiza el contenido del buffer.
   *
   * @param buffer Buffer del archivo
   * @param fileName Nombre del archivo (usado como fallback)
   * @returns Tipo MIME
   */
  detectMimeTypeFromBuffer(buffer: Buffer, fileName: string): string
  {
    // Si se quiere una detección más precisa basada en la firma del archivo,
    // aquí se podría implementar la lógica con file-type u otra librería similar

    // Como fallback, usamos el nombre del archivo
    return this.detectMimeType(fileName);
  }
}
