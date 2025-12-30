import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { AchievementsModule } from './achievements/achievements.module';
import { CompetitionsModule } from './competitions/competitions.module';
import { SkillsModule } from './skills/skills.module';
import { UploadModule } from './upload/upload.module';
import { CloudinaryProvider } from './common/cloudinary.config';
import { StatsModule } from './stats/stats.module';
import { ContactsModule } from './contacts/contacts.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio'),
    AuthModule,
    UsersModule,
    ProjectsModule,
    AchievementsModule,
    CompetitionsModule,
    SkillsModule,
    UploadModule,StatsModule,ContactsModule,
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryProvider],
})
export class AppModule {}