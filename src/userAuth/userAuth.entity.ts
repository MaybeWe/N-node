import { Entity, Column, PrimaryColumn, OneToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class UserAuth {
  @PrimaryColumn()
  userId: number;

  @Column()
  code: string;
}