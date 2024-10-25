import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { Member } from './member.entity';
import { OrderHelper } from 'src/helper/order.helper';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  providers: [MembersService, OrderHelper],
  controllers: [MembersController]
})
export class MembersModule {}
