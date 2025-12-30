import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Achievement extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: Date })
  date: Date;

  @Prop()
  certificateUrl: string;

  @Prop()
  organization: string;

  // Thêm để phân quyền và hỗ trợ draft
  @Prop({ required: true })
  userId: string;

  @Prop({ default: true })
  isPublished: boolean;
}

export const AchievementSchema = SchemaFactory.createForClass(Achievement);