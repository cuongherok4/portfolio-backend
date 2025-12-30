import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Competition extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  rank: string;

  @Prop({ type: Date })
  date: Date;

  @Prop()
  description: string;

  @Prop()
  prizeUrl: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ default: true })
  isPublished: boolean;
}

export const CompetitionSchema = SchemaFactory.createForClass(Competition);