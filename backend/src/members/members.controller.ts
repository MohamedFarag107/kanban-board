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
import { ReorderMembersDto } from './dto/reorder-members.dto';
import { OrderHelper } from 'src/helper/order.helper';
import { UpdateMemberDto } from './dto/update-member.dto';

@Controller('members')
export class MembersController {
  constructor(
    private readonly membersService: MembersService,
    private readonly orderHelper: OrderHelper,
  ) {}

  @Post()
  async create(@Body() memberData: CreateMemberDto): Promise<Member> {
    const { email, status } = memberData;

    const member = await this.membersService.findMemberByEmail(email);

    if (member) {
      throw new BadRequestException('Email Already Exists');
    }

    const lastMember = await this.membersService.getLastMemberOfStatus(status);
    const order = this.orderHelper.generateKeyBetween(lastMember?.order, null);

    return await this.membersService.create({ ...memberData, order });
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
    @Body() updateData: UpdateMemberDto,
  ): Promise<Member> {
    const { status, email } = updateData;
    const data: Partial<Member> = updateData;

    const member = await this.membersService.findOneById(+id);

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    if (status && status !== member.status) {
      const lastMember =
        await this.membersService.getLastMemberOfStatus(status);
      const order = this.orderHelper.generateKeyBetween(
        lastMember?.order,
        null,
      );
      data.order = order;
    }

    if (email && email !== member.email) {
      const member = await this.membersService.findMemberByEmail(email);
      if (member) {
        throw new BadRequestException(
          'Cannot use this email because someone already uses it',
        );
      }
    }

    return this.membersService.update(+id, data);
  }

  @Put('/reorder/:id')
  async reorderMembers(
    @Param('id') id: string,
    @Body() { status, bottomMemberId, topMemberId }: ReorderMembersDto,
  ): Promise<Member> {
    const member = await this.membersService.findOneById(+id);

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    const topMember = topMemberId
      ? await this.membersService.findOneById(topMemberId)
      : null;

    if (topMemberId && !topMember) {
      throw new NotFoundException('Top Member not found');
    }

    const bottomMember = bottomMemberId
      ? await this.membersService.findOneById(bottomMemberId)
      : null;

    if (bottomMemberId && !bottomMember) {
      throw new NotFoundException('Bottom Member not found');
    }

    const newMemberOrder = this.orderHelper.generateKeyBetween(
      topMember?.order,
      bottomMember?.order,
    );

    return await this.membersService.update(+id, {
      status,
      order: newMemberOrder,
    });
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
