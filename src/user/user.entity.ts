import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn  } from 'typeorm';
import { UserAuth } from '../userAuth/userAuth.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  create_time: string;

  @OneToOne(() => UserAuth, userAuth => userAuth.userId)
  @JoinColumn()
  authcode: string;
}