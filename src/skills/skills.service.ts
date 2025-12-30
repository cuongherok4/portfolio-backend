import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill } from '../schemas/skill.schema';

@Injectable()
export class SkillsService {
  constructor(@InjectModel(Skill.name) private skillModel: Model<Skill>) {}

  async create(userId: string, createDto: any): Promise<Skill> {
    const skill = new this.skillModel({
      ...createDto,
      userId,
    });
    return skill.save();
  }

  async findAll(published?: boolean): Promise<Skill[]> {
    const filter = published !== undefined ? { isPublished: published } : { isPublished: true };
    return this.skillModel.find(filter).sort({ level: -1 }).exec();
  }

  async findByUser(userId: string): Promise<Skill[]> {
    return this.skillModel.find({ userId }).sort({ level: -1 }).exec();
  }

  async findOne(id: string): Promise<Skill> {
    const skill = await this.skillModel.findById(id).exec();
    if (!skill) throw new NotFoundException('Skill not found');
    return skill;
  }

  async update(id: string, userId: string, updateDto: any): Promise<Skill> {
    const skill = await this.skillModel.findById(id).exec();
    if (!skill) throw new NotFoundException('Skill not found');
    if (skill.userId !== userId) throw new ForbiddenException('Not authorized');

    return this.skillModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async remove(id: string, userId: string): Promise<any> {
    const skill = await this.skillModel.findById(id).exec();
    if (!skill) throw new NotFoundException('Skill not found');
    if (skill.userId !== userId) throw new ForbiddenException('Not authorized');

    return this.skillModel.findByIdAndDelete(id).exec();
  }
}