import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { MembersService } from './members.service';
import { Member } from './member.entity';
import { CreateMemberDto } from './dto/create-member.dto';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  async create(@Body() memberData: CreateMemberDto): Promise<Member> {
    const { email } = memberData;

    const member = await this.membersService.findMemberByEmail(email);

    if (member) {
      throw new BadRequestException('Email Already Exists');
    }

    return await this.membersService.create(memberData);
  }

  @Get()
  async findAll(): Promise<Member[]> {
    return await this.membersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Member> {
    const member = await this.membersService.findOneById(+id);

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    return member;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<Member>,
  ): Promise<Member> {
    const member = await this.membersService.update(+id, updateData);

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    return member;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Member> {
    const member = await this.membersService.remove(+id);

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    return member;
  }
}
