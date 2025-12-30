import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Achievement } from '../schemas/achievement.schema';

@Injectable()
export class AchievementsService {
  constructor(@InjectModel(Achievement.name) private achievementModel: Model<Achievement>) {}

  async create(userId: string, createDto: any): Promise<Achievement> {
    const achievement = new this.achievementModel({
      ...createDto,
      userId,
    });
    return achievement.save();
  }

  async findAll(published?: boolean): Promise<Achievement[]> {
    const filter = published !== undefined ? { isPublished: published } : { isPublished: true };
    return this.achievementModel.find(filter).sort({ date: -1 }).exec();
  }

  async findByUser(userId: string): Promise<Achievement[]> {
    return this.achievementModel.find({ userId }).sort({ date: -1 }).exec();
  }

  async findOne(id: string): Promise<Achievement> {
    const achievement = await this.achievementModel.findById(id).exec();
    if (!achievement) throw new NotFoundException('Achievement not found');
    return achievement;
  }

  async update(id: string, userId: string, updateDto: any): Promise<Achievement> {
    const achievement = await this.achievementModel.findById(id).exec();
    if (!achievement) throw new NotFoundException('Achievement not found');
    if (achievement.userId !== userId) throw new ForbiddenException('Not authorized');

    return this.achievementModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async remove(id: string, userId: string): Promise<any> {
    const achievement = await this.achievementModel.findById(id).exec();
    if (!achievement) throw new NotFoundException('Achievement not found');
    if (achievement.userId !== userId) throw new ForbiddenException('Not authorized');

    return this.achievementModel.findByIdAndDelete(id).exec();
  }
}