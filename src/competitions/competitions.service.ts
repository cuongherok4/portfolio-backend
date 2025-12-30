import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Competition } from '../schemas/competition.schema';

@Injectable()
export class CompetitionsService {
  constructor(@InjectModel(Competition.name) private competitionModel: Model<Competition>) {}

  async create(userId: string, createDto: any): Promise<Competition> {
    const competition = new this.competitionModel({
      ...createDto,
      userId,
    });
    return competition.save();
  }

  async findAll(published?: boolean): Promise<Competition[]> {
    const filter = published !== undefined ? { isPublished: published } : { isPublished: true };
    return this.competitionModel.find(filter).sort({ date: -1 }).exec();
  }

  async findByUser(userId: string): Promise<Competition[]> {
    return this.competitionModel.find({ userId }).sort({ date: -1 }).exec();
  }

  async findOne(id: string): Promise<Competition> {
    const competition = await this.competitionModel.findById(id).exec();
    if (!competition) throw new NotFoundException('Competition not found');
    return competition;
  }

  async update(id: string, userId: string, updateDto: any): Promise<Competition> {
    const competition = await this.competitionModel.findById(id).exec();
    if (!competition) throw new NotFoundException('Competition not found');
    if (competition.userId !== userId) throw new ForbiddenException('Not authorized');

    return this.competitionModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async remove(id: string, userId: string): Promise<any> {
    const competition = await this.competitionModel.findById(id).exec();
    if (!competition) throw new NotFoundException('Competition not found');
    if (competition.userId !== userId) throw new ForbiddenException('Not authorized');

    return this.competitionModel.findByIdAndDelete(id).exec();
  }
}