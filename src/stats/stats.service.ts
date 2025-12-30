// src/stats/stats.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stats } from '../schemas/stats.schema';

@Injectable()
export class StatsService {
  constructor(@InjectModel(Stats.name) private statsModel: Model<Stats>) {}

  async getStats() {
    let stats = await this.statsModel.findOne();
    if (!stats) {
      stats = new this.statsModel({ totalViews: 0 });
      await stats.save();
    }
    return stats;
  }

  async incrementView() {
    let stats = await this.statsModel.findOne();
    if (!stats) {
      stats = new this.statsModel({ totalViews: 1 });
    } else {
      stats.totalViews += 1;
    }
    await stats.save();
    return stats.totalViews;
  }
}