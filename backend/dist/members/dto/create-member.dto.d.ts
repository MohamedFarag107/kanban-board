import { Status } from '../member.entity';
export declare class CreateMemberDto {
    name: string;
    title: string;
    age: number;
    email: string;
    mobile_number: string;
    status: Status;
}
