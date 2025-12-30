import { 
  IsString, 
  IsNotEmpty, 
  IsArray, 
  IsOptional, 
  IsBoolean, 
  IsDateString,
  IsEnum,
  IsNumber
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsArray()
  @IsOptional()
  videos?: string[];

  @IsArray()
  @IsOptional()
  technologies?: string[];

  @IsString()
  @IsOptional()
  demoUrl?: string;

  @IsString()
  @IsOptional()
  githubUrl?: string;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @IsEnum(['completed', 'in-progress', 'planning'])
  @IsOptional()
  status?: string;

  @IsDateString()
  @IsOptional()
  startDate?: Date;

  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsArray()
  @IsOptional()
  videos?: string[];

  @IsArray()
  @IsOptional()
  technologies?: string[];

  @IsString()
  @IsOptional()
  demoUrl?: string;

  @IsString()
  @IsOptional()
  githubUrl?: string;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @IsEnum(['completed', 'in-progress', 'planning'])
  @IsOptional()
  status?: string;

  @IsDateString()
  @IsOptional()
  startDate?: Date;

  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}