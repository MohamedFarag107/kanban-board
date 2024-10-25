import { Repository } from 'typeorm';
import { Member, Status } from './member.entity';
export declare class MembersService {
    private readonly membersRepository;
    constructor(membersRepository: Repository<Member>);
    getLastMemberOfStatus(status: Status): Promise<Member | null>;
    create(memberData: Partial<Member>): Promise<Member>;
    findAll(): Promise<Member[]>;
    findOneById(id: number): Promise<Member | null>;
    update(id: number, updateData: Partial<Member>): Promise<Member | null>;
    remove(id: number): Promise<Member | null>;
    findMemberByEmail(email: string): Promise<Member | null>;
}
