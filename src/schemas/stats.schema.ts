// src/schemas/stats.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Stats extends Document {
  @Prop({ default: 0 })
  totalViews: number;
}

export const StatsSchema = SchemaFactory.createForClass(Stats);