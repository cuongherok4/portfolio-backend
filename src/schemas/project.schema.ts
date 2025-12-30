// src/schemas/project.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  thumbnailUrl: string;

  @Prop()
  demoVideoUrl: string;

  @Prop([String])
  images: string[];

  @Prop([String])
  technologies: string[];

  @Prop()
  githubLink: string;

  @Prop()
  liveLink: string;

  // Thêm các field quan trọng
  @Prop({ required: true })
  userId: string; // owner

  @Prop({ default: false })
  isPublished: boolean; // cho phép draft

  @Prop({ default: false })
  isFeatured: boolean; // project nổi bật trên trang chủ
}

export const ProjectSchema = SchemaFactory.createForClass(Project);