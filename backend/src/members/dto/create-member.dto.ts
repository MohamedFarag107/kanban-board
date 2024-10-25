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
import { ApiProperty } from '@nestjs/swagger';

export class CreateMemberDto {
  @ApiProperty({
    description: 'The name of a member',
    type: 'string',
    required: true,
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The title of a member',
    type: 'string',
    required: true,
    example: 'Software Engineer',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The age of a member',
    type: 'number',
    required: true,
    example: 30,
  })
  @IsNumber()
  age: number;

  @ApiProperty({
    description: 'The email of a member',
    type: 'string',
    required: true,
    example: 'example@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The mobile number of a member',
    type: 'string',
    required: true,
    example: '+201234567890',
  })
  @IsPhoneNumber()
  mobile_number: string;

  @ApiProperty({
    description: `The status of a member. It should be one of the following values: 'Unclaimed', 'First Contact', 'Preparing Work Offer', 'Send to Therapist'`,
    type: 'string',
    required: true,
    example: 'Unclaimed',
  })
  @IsEnum(Status)
  status: Status;
}
