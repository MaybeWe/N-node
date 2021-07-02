/*
 * @Author: your name
 * @Date: 2021-06-30 15:40:13
 * @LastEditTime: 2021-06-30 17:03:36
 * @LastEditors: your name
 * @Description: In User Settings Edit
 */
import { Controller, Get } from '@nestjs/common';
@Controller('login')
export class LoginController {
  @Get()
  findAll(): string {
    return 'This action returns all login';
  }
}
