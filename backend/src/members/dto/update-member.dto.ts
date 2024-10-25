import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';
import { Status } from '../member.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMemberDto {
  @ApiProperty({
    description: 'The name of a member',
    type: 'string',
    required: true,
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    description: 'The title of a member',
    type: 'string',
    required: true,
    example: 'Software Engineer',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @ApiProperty({
    description: 'The age of a member',
    type: 'number',
    required: true,
    example: 30,
  })
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiProperty({
    description: 'The email of a member',
    type: 'string',
    required: true,
    example: 'example@gmail.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'The mobile number of a member',
    type: 'string',
    required: true,
    example: '+201234567890',
  })
  @IsOptional()
  @IsPhoneNumber()
  mobile_number?: string;

  @ApiProperty({
    description: `The status of a member. It should be one of the following values: 'Unclaimed', 'First Contact', 'Preparing Work Offer', 'Send to Therapist'`,
    type: 'string',
    required: true,
    example: 'Unclaimed',
  })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
