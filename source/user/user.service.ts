/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable jsdoc/require-description */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto, UpdateUserDto, UserDeleteByIdDto } from './user.dto';
import { User } from './user.entity';
import { Repository } from '.pnpm/typeorm@0.3.6_pg@8.7.3/node_modules/typeorm';

@Injectable()
export class UserService {

  public constructor(
    @InjectRepository(User) private readonly repository: Repository<User>) { }

  /**
   * Create a user.
   * @param user
   */
  public async createUser(user: CreateUserDto): Promise<User> {
    const { name, email } = user;

    const userEntity = this.repository.create({
      name,
      email,
    });
    return this.repository.save(userEntity);
  }

  /**
   * Read user by id.
   * @param id
   */
  public async readUserbyId(id: string): Promise<User> {
    const user = await this.repository.findOneBy({ id });

    if (!user) throw new BadRequestException('User not found!');

    return user;
  }

  /**
   * Update user name or description by id.
   * @param params
   */
  public async updateUserById(params: UpdateUserDto): Promise<User> {
    const { id, ...rest } = params;

    const user = await this.readUserbyId(id);

    return this.repository.save({
      ...user,
      ...rest,
    });
  }

  /**
   * Delete user by id.
   * @param params
   */
  public async deleteUserById(params: UserDeleteByIdDto): Promise<void> {
    const { id } = params;

    // await this.deleteUserById(id);
    await this.repository.delete(id);

    return;
  }

}
