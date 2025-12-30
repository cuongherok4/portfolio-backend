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
import { CompetitionsService } from './competitions.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('competitions')
export class CompetitionsController {
  constructor(private readonly competitionsService: CompetitionsService) {}

  // Public: tất cả cuộc thi đã publish
  @Get()
  async findAll(@Query('published') published?: string) {
    const isPublished = published === 'false' ? false : true;
    return this.competitionsService.findAll(isPublished);
  }

  // Protected: cuộc thi của user hiện tại
  @Get('my')
  @UseGuards(JwtAuthGuard)
  async findByUser(@Request() req) {
    return this.competitionsService.findByUser(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.competitionsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Request() req, @Body() createDto: any) {
    return this.competitionsService.create(req.user.userId, createDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Request() req, @Body() updateDto: any) {
    return this.competitionsService.update(id, req.user.userId, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req) {
    return this.competitionsService.remove(id, req.user.userId);
  }
}