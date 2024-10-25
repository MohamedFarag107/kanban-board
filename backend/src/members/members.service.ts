import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Member, Status } from './member.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly membersRepository: Repository<Member>,
  ) {}

  getLastMemberOfStatus(status: Status): Promise<Member | null> {
    return this.membersRepository
      .createQueryBuilder('member')
      .where('member.status = :status', { status })
      .orderBy(`member.order COLLATE "C"`, 'DESC')
      .getOne();
  }

  create(memberData: Partial<Member>): Promise<Member> {
    const member = this.membersRepository.create(memberData);
    return this.membersRepository.save(member);
  }

  findAll(): Promise<Member[]> {
    return this.membersRepository
      .createQueryBuilder('member')
      .orderBy('member.status', 'ASC')
      .addOrderBy(`member.order COLLATE "C"`, 'ASC')
      .getMany();
  }

  findOneById(id: number): Promise<Member | null> {
    return this.membersRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateData: Partial<Member>,
  ): Promise<Member | null> {
    const member = await this.findOneById(id);

    if (!member) return null;

    Object.assign(member, updateData);

    return this.membersRepository.save(member);
  }

  async remove(id: number): Promise<Member | null> {
    const member = await this.findOneById(id);

    if (!member) return null;

    await this.membersRepository.delete(id);

    return member;
  }

  findMemberByEmail(email: string): Promise<Member | null> {
    return this.membersRepository.findOne({ where: { email } });
  }
}
