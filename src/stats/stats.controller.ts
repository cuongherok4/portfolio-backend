// src/stats/stats.controller.ts
import { Controller, Get, Post } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private statsService: StatsService) {}

  @Get()
  async getViews() {
    const stats = await this.statsService.getStats();
    return { totalViews: stats.totalViews };
  }

  @Post('view')
  async incrementView() {
    const views = await this.statsService.incrementView();
    return { totalViews: views };
  }
}