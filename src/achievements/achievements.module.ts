import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AchievementsController } from './achievements.controller';
import { AchievementsService } from './achievements.service';
import { AchievementSchema } from '../schemas/achievement.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Achievement', schema: AchievementSchema }]),
  ],
  controllers: [AchievementsController],
  providers: [AchievementsService],
})
export class AchievementsModule {}