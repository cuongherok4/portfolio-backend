import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get()
  async findAll(@Query('published') published?: string) {
    const isPublished = published === 'false' ? false : true;
    return this.achievementsService.findAll(isPublished);
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  async findByUser(@Request() req) {
    return this.achievementsService.findByUser(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.achievementsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Request() req, @Body() createDto: any) {
    return this.achievementsService.create(req.user.userId, createDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Request() req, @Body() updateDto: any) {
    return this.achievementsService.update(id, req.user.userId, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req) {
    return this.achievementsService.remove(id, req.user.userId);
  }
}