import { MembersService } from './members.service';
import { Member } from './member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { ReorderMembersDto } from './dto/reorder-members.dto';
import { OrderHelper } from 'src/helper/order.helper';
import { UpdateMemberDto } from './dto/update-member.dto';
export declare class MembersController {
    private readonly membersService;
    private readonly orderHelper;
    constructor(membersService: MembersService, orderHelper: OrderHelper);
    create(memberData: CreateMemberDto): Promise<Member>;
    findAll(): Promise<Member[]>;
    findOne(id: string): Promise<Member>;
    update(id: string, updateData: UpdateMemberDto): Promise<Member>;
    reorderMembers(id: string, { status, bottomMemberId, topMemberId }: ReorderMembersDto): Promise<Member>;
    remove(id: string): Promise<Member>;
}
