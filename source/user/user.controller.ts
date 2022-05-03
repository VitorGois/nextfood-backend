import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

  public constructor(
    private readonly userService: UserService,
  ) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createUser(@Body() body: CreateUserDto): Promise<any> {
    return this.userService.createUser(body);
  }

}
