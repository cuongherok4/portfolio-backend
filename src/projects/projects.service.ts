// src/projects/projects.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from '../schemas/project.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  // Tạo project mới (chỉ owner)
  async create(userId: string, createDto: any): Promise<Project> {
    const project = new this.projectModel({
      ...createDto,
      userId, // lưu owner
    });
    return project.save();
  }

  // Lấy tất cả project public (cho trang chủ portfolio)
  // Nếu isPublished = true → chỉ lấy published, false → tất cả (dùng cho admin)
  async findAll(isPublished?: boolean): Promise<Project[]> {
    const filter = isPublished !== undefined ? { isPublished } : {};
    return this.projectModel
      .find(filter)
      .sort({ createdAt: -1 })
      .exec();
  }

  // Lấy các project featured (bạn có thể thêm field isFeatured trong schema nếu cần)
  async getFeatured(): Promise<Project[]> {
    return this.projectModel
      .find({ isFeatured: true, isPublished: true })
      .sort({ createdAt: -1 })
      .limit(6) // lấy tối đa 6 project nổi bật
      .exec();
  }

  // Lấy project của chính user đó (dùng cho admin dashboard)
  async findByUser(userId: string): Promise<Project[]> {
    return this.projectModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }

  // Lấy 1 project theo id (public ai cũng xem được nếu published)
  async findOne(id: string): Promise<Project> {
    const project = await this.projectModel.findById(id).exec();
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    // Nếu chưa published thì chỉ owner được xem? (tùy bạn, dưới đây là public luôn)
    return project;
  }

  // Cập nhật project (chỉ owner)
  async update(id: string, userId: string, updateDto: any): Promise<Project> {
    const project = await this.projectModel.findById(id).exec();
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    if (project.userId !== userId) {
      throw new ForbiddenException('You can only update your own projects');
    }

    return this.projectModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
  }

  // Xóa project (chỉ owner)
  async remove(id: string, userId: string): Promise<any> {
    const project = await this.projectModel.findById(id).exec();
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    if (project.userId !== userId) {
      throw new ForbiddenException('You can only delete your own projects');
    }

    return this.projectModel.findByIdAndDelete(id).exec();
  }
}