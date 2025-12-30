// src/stats/stats.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatsService } from './stats.service';
import { StatsSchema } from '../schemas/stats.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Stats', schema: StatsSchema }])],
  providers: [StatsService],
  exports: [StatsService],
})
export class StatsModule {}