// src/contacts/contacts.controller.ts
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('contacts')
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  // PUBLIC - khách gửi không cần login
  @Post()
  async create(@Body() data: any) {
    return this.contactsService.create(data);
  }

  // PROTECTED - chỉ admin xem
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.contactsService.findAll();
  }
}