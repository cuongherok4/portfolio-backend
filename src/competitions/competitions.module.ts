import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompetitionsController } from './competitions.controller';
import { CompetitionsService } from './competitions.service';
import { CompetitionSchema } from '../schemas/competition.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Competition', schema: CompetitionSchema }]),
  ],
  controllers: [CompetitionsController],
  providers: [CompetitionsService],
})
export class CompetitionsModule {}