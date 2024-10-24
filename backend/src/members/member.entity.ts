import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum Status {
  UNCLAIMED = 'Unclaimed',
  FIRST_CONTACT = 'First Contact',
  PREPARING_WORK_OFFER = 'Preparing Work Offer',
  SEND_TO_THERAPIST = 'Send to Therapist',
}

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  age: number;

  @Column({ unique: true })
  email: string;

  @Column()
  mobile_number: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.UNCLAIMED,
  })
  status: Status;

  @Column()
  order: string;
}
