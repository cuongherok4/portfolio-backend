// src/projects/projects.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // Public: Lấy tất cả project đã publish (cho trang portfolio)
  @Get()
  async findAll(@Query('published') published?: string) {
    const isPublished = published === 'true' ? true : published === 'false' ? false : true;
    return this.projectsService.findAll(isPublished);
  }

  // Public: Lấy project nổi bật
  @Get('featured')
  async getFeatured() {
    return this.projectsService.getFeatured();
  }

  // Protected: Lấy project của user hiện tại (admin dashboard)
  @Get('my')
  @UseGuards(JwtAuthGuard)
  async findByUser(@Request() req) {
    return this.projectsService.findByUser(req.user.userId);
  }

  // Public: Chi tiết 1 project
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  // Protected: Tạo mới
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Request() req, @Body() createProjectDto: any) {
    return this.projectsService.create(req.user.userId, createProjectDto);
  }

  // Protected: Cập nhật
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateProjectDto: any,
  ) {
    return this.projectsService.update(id, req.user.userId, updateProjectDto);
  }

  // Protected: Xóa
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req) {
    return this.projectsService.remove(id, req.user.userId);
  }
}