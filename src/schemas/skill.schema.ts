import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Skill extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ default: 70, min: 0, max: 100 })
  level: number;

  @Prop()
  iconUrl: string;

  @Prop()
  category: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ default: true })
  isPublished: boolean;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);