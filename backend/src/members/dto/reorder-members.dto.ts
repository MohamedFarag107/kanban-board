// members/dto/create-member.dto.ts
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Status } from '../member.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ReorderMembersDto {
  @ApiProperty({
    description: `The status of a member. It should be one of the following values: 'Unclaimed', 'First Contact', 'Preparing Work Offer', 'Send to Therapist'`,
    type: 'string',
    required: true,
    example: 'Unclaimed',
  })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({
    description: 'top member id',
    type: 'number',
    required: false,
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  topMemberId?: number;

  @ApiProperty({
    description: 'bottom member id',
    type: 'number',
    required: false,
    example: 2,
  })
  @IsOptional()
  @IsNumber()
  bottomMemberId?: number;
}
