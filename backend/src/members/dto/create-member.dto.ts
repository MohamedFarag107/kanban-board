// members/dto/create-member.dto.ts
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  Matches,
  IsPhoneNumber,
} from 'class-validator';
import { Status } from '../member.entity';

export class CreateMemberDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  age: number;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  mobile_number: string;

  @IsEnum(Status)
  status: Status;
}
