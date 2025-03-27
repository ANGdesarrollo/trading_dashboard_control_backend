import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';

// Define una interfaz para los items devueltos por listObjects
interface ObjectInfo {
  name?: string;
  prefix?: string;
  size?: number;
  etag?: string;
  lastModified?: Date;
}

@Injectable()
export class MinioService implements OnModuleInit
{
  private readonly client: Minio.Client;
  private readonly bucketName: string;
  private readonly logger = new Logger(MinioService.name);

  constructor(private readonly configService: ConfigService)
  {
    this.client = new Minio.Client({
      endPoint: configService.get('MINIO_HOST', 'localhost'),
      port: parseInt(configService.get('MINIO_PORT', '9000'), 10),
      useSSL: configService.get('MINIO_USE_SSL', 'false') === 'true',
      accessKey: configService.get('MINIO_ACCESS_KEY', 'minioadmin'),
      secretKey: configService.get('MINIO_SECRET_KEY', 'minioadmin')
    });

    this.bucketName = configService.get('MINIO_BUCKET_NAME', 'default-bucket');
  }

  async onModuleInit(): Promise<void>
  {
    await this.initBucket();
  }

  private async initBucket(): Promise<void>
  {
    // Check if bucket exists
    const exists = await this.client.bucketExists(this.bucketName)
      .catch(error =>
      {
        this.logger.error(`Error checking if bucket exists: ${error.message}`);
        throw error;
      });

    if (!exists)
    {
      // Create bucket if it doesn't exist
      await this.client.makeBucket(this.bucketName, 'us-east-1')
        .catch(error =>
        {
          this.logger.error(`Error creating bucket: ${error.message}`);
          throw error;
        });

      this.logger.log(`Bucket '${this.bucketName}' created successfully`);

      // Set public policy for the bucket if needed
      const publicPolicy = {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: { AWS: ['*'] },
            Action: ['s3:GetObject'],
            Resource: [`arn:aws:s3:::${this.bucketName}/*`]
          }
        ]
      };

      await this.client.setBucketPolicy(
        this.bucketName,
        JSON.stringify(publicPolicy)
      ).catch(error =>
      {
        this.logger.error(`Error setting bucket policy: ${error.message}`);
        throw error;
      });

      this.logger.log(`Public policy set for bucket '${this.bucketName}'`);
    }
    else
    {
      this.logger.log(`Bucket '${this.bucketName}' already exists`);
    }
  }

  async uploadFile(
    file: Buffer,
    objectName: string,
    metaData?: Minio.ItemBucketMetadata,
    isPublic = true
  ): Promise<string>
  {
    await this.client.putObject(
      this.bucketName,
      objectName,
      file,
      file.length,
      metaData
    ).catch(error =>
    {
      this.logger.error(`Error uploading file: ${error.message}`);
      throw error;
    });

    // Return the URL to the uploaded file or just the object name
    if (isPublic)
    {
      // Construct URL based on config values instead of accessing protected properties
      const protocol = this.configService.get('MINIO_USE_SSL', 'false') === 'true' ? 'https' : 'http';
      const host = this.configService.get('MINIO_HOST', 'localhost');
      const port = this.configService.get('MINIO_PORT', '9000');

      return `${protocol}://${host}:${port}/${this.bucketName}/${objectName}`;
    }

    return objectName;
  }

  async getFile(objectName: string): Promise<Buffer>
  {
    const dataStream = await this.client.getObject(
      this.bucketName,
      objectName
    ).catch(error =>
    {
      this.logger.error(`Error getting file: ${error.message}`);
      throw error;
    });

    return new Promise((resolve, reject) =>
    {
      const chunks: Buffer[] = [];
      dataStream.on('data', (chunk) => chunks.push(chunk));
      dataStream.on('end', () => resolve(Buffer.concat(chunks)));
      dataStream.on('error', (err) =>
      {
        this.logger.error(`Error streaming file: ${err.message}`);
        reject(err);
      });
    });
  }

  async deleteFile(objectName: string): Promise<void>
  {
    await this.client.removeObject(this.bucketName, objectName)
      .catch(error =>
      {
        this.logger.error(`Error deleting file: ${error.message}`);
        throw error;
      });
  }

  async listFiles(prefix?: string, recursive = true): Promise<ObjectInfo[]>
  {
    const files: ObjectInfo[] = [];
    const stream = this.client.listObjects(this.bucketName, prefix, recursive);

    return new Promise((resolve, reject) =>
    {
      stream.on('data', (obj: ObjectInfo) => files.push(obj));
      stream.on('end', () => resolve(files));
      stream.on('error', (err) =>
      {
        this.logger.error(`Error listing files: ${err.message}`);
        reject(err);
      });
    });
  }

  getFileUrl(objectName: string, expiry = 60 * 60): Promise<string>
  {
    return this.client.presignedGetObject(this.bucketName, objectName, expiry)
      .catch(error =>
      {
        this.logger.error(`Error generating presigned URL: ${error.message}`);
        throw error;
      });
  }

  getPublicUrl(objectName: string): string
  {
    // Construct URL based on config values instead of accessing protected properties
    const protocol = this.configService.get('MINIO_USE_SSL', 'false') === 'true' ? 'https' : 'http';
    const host = this.configService.get('MINIO_HOST', 'localhost');
    const port = this.configService.get('MINIO_PORT', '9000');

    return `${protocol}://${host}:${port}/${this.bucketName}/${objectName}`;
  }
}
