#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Validate input
if (process.argv.length < 3)
{
  console.error('Usage: pnpm create module "EntityName"');
  process.exit(1);
}

// Get the entity name from command line arguments
const entityName = process.argv[2];

// Convert names to different case formats
const entityNameCamel = entityName.charAt(0).toLowerCase() + entityName.slice(1);
const entityNameUpper = entityName.toUpperCase();
const entityNamePascal = entityName.charAt(0).toUpperCase() + entityName.slice(1);

// Base directory for the module
const baseDir = path.join(process.cwd(), 'src', entityNamePascal);

// Create directories
const directories = [
  baseDir,
  path.join(baseDir, 'Application'),
  path.join(baseDir, 'Domain'),
  path.join(baseDir, 'Domain', 'Entities'),
  path.join(baseDir, 'Infrastructure'),
  path.join(baseDir, 'Presentation'),
  path.join(baseDir, 'Presentation', 'Controllers'),
  path.join(baseDir, 'Presentation', 'Dtos')
];

// Create test directory
const testDir = path.join(process.cwd(), 'test', entityNamePascal);
directories.push(testDir);

// Create directories
directories.forEach(dir =>
{
  if (!fs.existsSync(dir))
{
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Template files
const templates = [
  // Domain files
  {
    path: path.join(baseDir, 'Domain', 'Entities', `${entityNamePascal}Domain.ts`),
    content: `import { BaseDomain } from '../../../Shared/Domain/Repositories/BaseDomain';

export interface ${entityNamePascal}Domain extends BaseDomain {
  id: string;
  // Add your entity properties here
}
`
  },
  {
    path: path.join(baseDir, 'Domain', 'Entities', `${entityNamePascal}.ts`),
    content: `export class ${entityNamePascal} {
  public id: string;
  // Add your entity properties and constructor here
  
  constructor(id: string) {
    this.id = id;
    // Initialize other properties
  }
}
`
  },
  // Infrastructure files
  {
    path: path.join(baseDir, 'Infrastructure', `${entityNamePascal}Repository.ts`),
    content: `import { BaseRepository } from '../../Shared/Domain/Repositories/BaseRepository';
import { ${entityNamePascal}Domain } from '../Domain/Entities/${entityNamePascal}Domain';
import { ${entityNamePascal}Dto } from '../Presentation/Dtos/${entityNamePascal}Dto';

export abstract class ${entityNamePascal}Repository extends BaseRepository<${entityNamePascal}Dto, ${entityNamePascal}Domain> {}
`
  },
  {
    path: path.join(baseDir, 'Infrastructure', `${entityNamePascal}RepositoryImpl.ts`),
    content: `import { Injectable } from '@nestjs/common';
import { BasePrismaRepositoryImpl } from 'src/Shared/Infrastructure/BasePrismaRepositoryImpl';

import { PrismaService } from '../../Shared/Infrastructure/DatabaseService';
import { ${entityNamePascal}Domain } from '../Domain/Entities/${entityNamePascal}Domain';
import { ${entityNamePascal}Dto } from '../Presentation/Dtos/${entityNamePascal}Dto';

import { ${entityNamePascal}Repository } from './${entityNamePascal}Repository';

@Injectable()
export class ${entityNamePascal}RepositoryImpl extends BasePrismaRepositoryImpl<${entityNamePascal}Dto, ${entityNamePascal}Domain> implements ${entityNamePascal}Repository {
  constructor(prisma: PrismaService) {
    super(prisma, '${entityNameCamel}');
  }
}
`
  },
  // Application files
  {
    path: path.join(baseDir, 'Application', `Create${entityNamePascal}UseCase.ts`),
    content: `import { Injectable } from '@nestjs/common';

import { ${entityNamePascal}Domain } from '../Domain/Entities/${entityNamePascal}Domain';
import { ${entityNamePascal}Repository } from '../Infrastructure/${entityNamePascal}Repository';
import { ${entityNamePascal}Dto } from '../Presentation/Dtos/${entityNamePascal}Dto';

@Injectable()
export class Create${entityNamePascal}UseCase {
  constructor(private readonly repository: ${entityNamePascal}Repository) {}

  async execute(payload: ${entityNamePascal}Dto): Promise<${entityNamePascal}Domain> {
    return this.repository.create(payload);
  }
}
`
  },
  {
    path: path.join(baseDir, 'Application', `Delete${entityNamePascal}UseCase.ts`),
    content: `import { Injectable, NotFoundException } from '@nestjs/common';

import { ${entityNamePascal}Repository } from '../Infrastructure/${entityNamePascal}Repository';

@Injectable()
export class Delete${entityNamePascal}UseCase {
  constructor(private readonly repository: ${entityNamePascal}Repository) {}

  async execute(id: string): Promise<void> {
    const ${entityNameCamel} = await this.repository.findOneBy('id', id);

    if (!${entityNameCamel}) {
      throw new NotFoundException(\`${entityNamePascal} with id \${id} not found\`);
    }

    await this.repository.delete(id);
  }
}
`
  },
  {
    path: path.join(baseDir, 'Application', `Get${entityNamePascal}ByIdUseCase.ts`),
    content: `import { Injectable, NotFoundException } from '@nestjs/common';

import { ${entityNamePascal}Domain } from '../Domain/Entities/${entityNamePascal}Domain';
import { ${entityNamePascal}Repository } from '../Infrastructure/${entityNamePascal}Repository';

@Injectable()
export class Get${entityNamePascal}ByIdUseCase {
  constructor(private readonly repository: ${entityNamePascal}Repository) {}

  async execute(id: string): Promise<${entityNamePascal}Domain> {
    const ${entityNameCamel} = await this.repository.findOneBy('id', id);

    if (!${entityNameCamel}) {
      throw new NotFoundException(\`${entityNamePascal} with id \${id} not found\`);
    }

    return ${entityNameCamel};
  }
}
`
  },
  {
    path: path.join(baseDir, 'Application', `List${entityNamePascal}UseCase.ts`),
    content: `import { Injectable } from '@nestjs/common';

import { ${entityNamePascal}Domain } from '../Domain/Entities/${entityNamePascal}Domain';
import { ${entityNamePascal}Repository } from '../Infrastructure/${entityNamePascal}Repository';

@Injectable()
export class List${entityNamePascal}UseCase {
  constructor(private readonly repository: ${entityNamePascal}Repository) {}

  async execute(): Promise<${entityNamePascal}Domain[]> {
    return this.repository.list();
  }
}
`
  },
  {
    path: path.join(baseDir, 'Application', `Update${entityNamePascal}UseCase.ts`),
    content: `import { Injectable, NotFoundException } from '@nestjs/common';

import { ${entityNamePascal}Domain } from '../Domain/Entities/${entityNamePascal}Domain';
import { ${entityNamePascal}Repository } from '../Infrastructure/${entityNamePascal}Repository';
import { Update${entityNamePascal}Dto } from '../Presentation/Dtos/Update${entityNamePascal}Dto';

@Injectable()
export class Update${entityNamePascal}UseCase {
  constructor(private readonly repository: ${entityNamePascal}Repository) {}

  async execute(id: string, payload: Update${entityNamePascal}Dto): Promise<${entityNamePascal}Domain> {
    const ${entityNameCamel} = await this.repository.findOneBy('id', id);

    if (!${entityNameCamel}) {
      throw new NotFoundException(\`${entityNamePascal} with id \${id} not found\`);
    }

    return this.repository.update(id, payload);
  }
}
`
  },
  {
    path: path.join(baseDir, 'Application', 'index.ts'),
    content: `// src/${entityNamePascal}/Application/index.ts
import { Create${entityNamePascal}UseCase } from './Create${entityNamePascal}UseCase';
import { Delete${entityNamePascal}UseCase } from './Delete${entityNamePascal}UseCase';
import { Get${entityNamePascal}ByIdUseCase } from './Get${entityNamePascal}ByIdUseCase';
import { List${entityNamePascal}UseCase } from './List${entityNamePascal}UseCase';
import { Update${entityNamePascal}UseCase } from './Update${entityNamePascal}UseCase';

export const ${entityNamePascal}UseCases = [
  Create${entityNamePascal}UseCase,
  List${entityNamePascal}UseCase,
  Get${entityNamePascal}ByIdUseCase,
  Update${entityNamePascal}UseCase,
  Delete${entityNamePascal}UseCase
];
`
  },
  // Presentation files
  {
    path: path.join(baseDir, 'Presentation', 'Dtos', `${entityNamePascal}Dto.ts`),
    content: `// src/${entityNamePascal}/Presentation/Dtos/${entityNamePascal}Dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class ${entityNamePascal}Dto {
  @IsString()
  @IsNotEmpty()
  exampleField: string;

  // Add your DTO fields here with appropriate decorators
}
`
  },
  {
    path: path.join(baseDir, 'Presentation', 'Dtos', `Update${entityNamePascal}Dto.ts`),
    content: `import { PartialType } from '@nestjs/mapped-types';

import { ${entityNamePascal}Dto } from './${entityNamePascal}Dto';

export class Update${entityNamePascal}Dto extends PartialType(${entityNamePascal}Dto) {}
`
  },
  {
    path: path.join(baseDir, 'Presentation', 'Controllers', 'GetController.ts'),
    content: `import { Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';

import { Get${entityNamePascal}ByIdUseCase } from '../../Application/Get${entityNamePascal}ByIdUseCase';
import { List${entityNamePascal}UseCase } from '../../Application/List${entityNamePascal}UseCase';
import { ${entityNamePascal}Domain } from '../../Domain/Entities/${entityNamePascal}Domain';

@Controller('${entityNameCamel}')
export class GetController {
  constructor(
    private readonly list${entityNamePascal}UseCase: List${entityNamePascal}UseCase,
    private readonly get${entityNamePascal}ByIdUseCase: Get${entityNamePascal}ByIdUseCase
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<${entityNamePascal}Domain[]> {
    return this.list${entityNamePascal}UseCase.execute();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getById(@Param('id', ParseUUIDPipe) id: string): Promise<${entityNamePascal}Domain> {
    return this.get${entityNamePascal}ByIdUseCase.execute(id);
  }
}
`
  },
  {
    path: path.join(baseDir, 'Presentation', 'Controllers', 'PostController.ts'),
    content: `import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { Create${entityNamePascal}UseCase } from '../../Application/Create${entityNamePascal}UseCase';
import { ${entityNamePascal}Domain } from '../../Domain/Entities/${entityNamePascal}Domain';
import { ${entityNamePascal}Dto } from '../Dtos/${entityNamePascal}Dto';

@Controller('${entityNameCamel}')
export class PostController {
  constructor(private readonly create${entityNamePascal}UseCase: Create${entityNamePascal}UseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: ${entityNamePascal}Dto): Promise<${entityNamePascal}Domain> {
    return this.create${entityNamePascal}UseCase.execute(body);
  }
}
`
  },
  {
    path: path.join(baseDir, 'Presentation', 'Controllers', 'PutController.ts'),
    content: `import { Body, Controller, HttpCode, HttpStatus, Param, ParseUUIDPipe, Put } from '@nestjs/common';

import { Update${entityNamePascal}UseCase } from '../../Application/Update${entityNamePascal}UseCase';
import { ${entityNamePascal}Domain } from '../../Domain/Entities/${entityNamePascal}Domain';
import { Update${entityNamePascal}Dto } from '../Dtos/Update${entityNamePascal}Dto';

@Controller('${entityNameCamel}')
export class PutController {
  constructor(private readonly update${entityNamePascal}UseCase: Update${entityNamePascal}UseCase) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: Update${entityNamePascal}Dto
  ): Promise<${entityNamePascal}Domain> {
    return this.update${entityNamePascal}UseCase.execute(id, body);
  }
}
`
  },
  {
    path: path.join(baseDir, 'Presentation', 'Controllers', 'DeleteController.ts'),
    content: `import { Controller, Delete, HttpCode, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';

import { Delete${entityNamePascal}UseCase } from '../../Application/Delete${entityNamePascal}UseCase';

@Controller('${entityNameCamel}')
export class DeleteController {
  constructor(private readonly delete${entityNamePascal}UseCase: Delete${entityNamePascal}UseCase) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.delete${entityNamePascal}UseCase.execute(id);
  }
}
`
  },
  // Module file
  {
    path: path.join(baseDir, `${entityNamePascal}Module.ts`),
    content: `// src/${entityNamePascal}/${entityNamePascal}Module.ts
import { Module } from '@nestjs/common';

import { ${entityNamePascal}UseCases } from './Application';
import { ${entityNamePascal}Repository } from './Infrastructure/${entityNamePascal}Repository';
import { ${entityNamePascal}RepositoryImpl } from './Infrastructure/${entityNamePascal}RepositoryImpl';
import { GetController } from './Presentation/Controllers/GetController';
import { PostController } from './Presentation/Controllers/PostController';
import { PutController } from './Presentation/Controllers/PutController';
import { DeleteController } from './Presentation/Controllers/DeleteController';

@Module({
  controllers: [GetController, PostController, PutController, DeleteController],
  providers: [
    ...${entityNamePascal}UseCases,
    {
      provide: ${entityNamePascal}Repository,
      useClass: ${entityNamePascal}RepositoryImpl
    }
  ]
})
export class ${entityNamePascal}Module {}
`
  },
  // Test file
  {
    path: path.join(testDir, `${entityNamePascal}.spec.ts`),
    content: `// test/${entityNamePascal}/${entityNamePascal}.spec.ts
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import TestAgent from 'supertest/lib/agent';

import { ${entityNamePascal}Dto } from '../../src/${entityNamePascal}/Presentation/Dtos/${entityNamePascal}Dto';
import { ${entityNamePascal}Module } from '../../src/${entityNamePascal}/${entityNamePascal}Module';
import { getTestAgent } from '../TestAgent';

let agent: TestAgent;
let app: NestFastifyApplication;
let ${entityNameCamel}Id: string;
let ${entityNameCamel}Data: ${entityNamePascal}Dto;

describe('${entityNamePascal} E2E', () => {
  beforeAll(async() => {
    const testAgent = await getTestAgent(${entityNamePascal}Module);
    agent = testAgent.agent;
    app = testAgent.app;
  });

  afterAll(async() => {
    await app.close();
  });

  describe('Create ${entityNamePascal}', () => {
    it('POST /${entityNameCamel}', async() => {
      ${entityNameCamel}Data = {
        exampleField: 'Example value'
        // Add test data for your entity
      };

      const response = await agent.post('/api/${entityNameCamel}').send(${entityNameCamel}Data);
      ${entityNameCamel}Id = response.body.id;

      expect(response.status).toBe(201);
      expect(response.body.exampleField).toBe(${entityNameCamel}Data.exampleField);
    });
  });

  describe('Get ${entityNamePascal}', () => {
    it('GET /${entityNameCamel}', async() => {
      const response = await agent.get('/api/${entityNameCamel}');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('GET /${entityNameCamel}/:id', async() => {
      const response = await agent.get(\`/api/${entityNameCamel}/\${${entityNameCamel}Id}\`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(${entityNameCamel}Id);
      expect(response.body.exampleField).toBe(${entityNameCamel}Data.exampleField);
    });
  });

  describe('Update ${entityNamePascal}', () => {
    it('PUT /${entityNameCamel}/:id', async() => {
      const updateData = {
        exampleField: 'Updated value'
      };

      const response = await agent.put(\`/api/${entityNameCamel}/\${${entityNameCamel}Id}\`).send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.exampleField).toBe(updateData.exampleField);
    });
  });

  describe('Delete ${entityNamePascal}', () => {
    it('DELETE /${entityNameCamel}/:id', async() => {
      const response = await agent.delete(\`/api/${entityNameCamel}/\${${entityNameCamel}Id}\`);

      expect(response.status).toBe(204);

      // Verify it's deleted
      const getResponse = await agent.get(\`/api/${entityNameCamel}/\${${entityNameCamel}Id}\`);
      expect(getResponse.status).toBe(404);
    });
  });
});
`
  },
  // Prisma schema file template
  {
    path: path.join(process.cwd(), 'prisma', 'schema', `${entityNameCamel}.prisma`),
    content: `model ${entityNamePascal} {
  id          String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  // Add your entity fields here
  created_at  DateTime @default(now())
  updated_at  DateTime @updatedAt

  @@map("${entityNameCamel}s")
}
`
  }
];

// Create files
templates.forEach(template =>
{
  fs.writeFileSync(template.path, template.content);
  console.log(`Created file: ${template.path}`);
});

// Create package.json script entry if it doesn't exist
try
{
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  if (!packageJson.scripts)
{
    packageJson.scripts = {};
  }

  if (!packageJson.scripts['create:module'])
{
    packageJson.scripts['create:module'] = 'node scripts/create-module.js';

    // Create scripts directory if it doesn't exist
    const scriptsDir = path.join(process.cwd(), 'scripts');
    if (!fs.existsSync(scriptsDir))
{
      fs.mkdirSync(scriptsDir);
    }

    // Copy this script to the scripts directory
    fs.copyFileSync(__filename, path.join(scriptsDir, 'create-module.js'));

    // Make the script executable
    fs.chmodSync(path.join(scriptsDir, 'create-module.js'), '755');

    // Update package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('Added create:module script to package.json');
  }
}
 catch (error)
{
  console.error('Error updating package.json:', error.message);
}

console.log(`✅ ${entityNamePascal} module created successfully!`);
console.log(`
🔍 Next steps:
1. Update Domain/Entities/${entityNamePascal}Domain.ts with your entity properties
2. Update Domain/Entities/${entityNamePascal}.ts with constructor and methods
3. Update Presentation/Dtos/${entityNamePascal}Dto.ts with validation
4. Add ${entityNamePascal}Module to your AppModule imports
5. Update your Prisma schema in prisma/schema/${entityNameCamel}.prisma
6. Run prisma migrate to create the database table
`);
