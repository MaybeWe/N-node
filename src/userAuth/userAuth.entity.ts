/*
 * @Author: your name
 * @Date: 2021-07-06 14:53:22
 * @LastEditors: your name
 * @LastEditTime: 2021-07-06 17:01:07
 * @Description: file content
 */
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('user_auth')
export class UserAuth {
  @PrimaryColumn()
  userId: number;

  @Column()
  code: string;
}