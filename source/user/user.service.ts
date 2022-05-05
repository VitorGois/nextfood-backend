/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable jsdoc/require-description */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as faunadb from 'faunadb';

import { FaunadbRecordBaseFields } from '../faunadb/faunadb.types';
import { CreateUserDto, UpdateUserDto, UserDeleteByIdDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {

  private faunadbQuery = faunadb.query;
  private faunaCollection: string = 'user';

  public constructor(
    @Inject('DATABASE_CONNECTION') private readonly clientDb: faunadb.Client,
  ) { }

  /**
   * Create a user.
   * @param params
   */
  public async createUser(params: CreateUserDto): Promise<User> {
    const userEntity = new User(params);

    try {
      const { data, ref } = await this.clientDb.query(
        this.faunadbQuery.Create(
          this.faunadbQuery.Collection(this.faunaCollection),
          { data: userEntity },
        ),
      ) as any as FaunadbRecordBaseFields<User>;
      return {
        id: ref.id,
        ...data,
      };
    } catch (e) {
      if (e.requestResult.statusCode === 404) {
        throw new NotFoundException('User not found');
      }

      throw new InternalServerErrorException(e);
    }
  }

  /**
   * Index a user.
   * @param userId
   */
  public async readUserById(userId: string): Promise<User> {
    try {
      const { data, ref } = await this.clientDb.query(
        this.faunadbQuery.Get(
          this.faunadbQuery.Ref(this.faunadbQuery.Collection(this.faunaCollection), userId),
        ),
      ) as any as FaunadbRecordBaseFields<User>;

      return {
        id: ref.id,
        ...data,
      };
    } catch (e) {
      if (e.requestResult.statusCode === 404) {
        throw new NotFoundException('User not found');
      }

      throw new InternalServerErrorException(e);
    }
  }

  /**
   *
   * @param params
   */
  public async updateUserById(params: UpdateUserDto): Promise<User> {
    const { id: userId, ...rest } = params;

    try {
      const { data, ref } = await this.clientDb.query(
        this.faunadbQuery.Update(
          this.faunadbQuery.Ref(this.faunadbQuery.Collection(this.faunaCollection), userId),
          { data: rest },
        ),
      ) as any as FaunadbRecordBaseFields<User>;

      return {
        id: ref.id,
        ...data,
      };
    } catch (e) {
      if (e.requestResult.statusCode === 404) {
        throw new NotFoundException('User not found');
      }

      throw new InternalServerErrorException(e);
    }
  }

  /**
   *
   * @param params
   */
  public async deleteUserById(params: UserDeleteByIdDto): Promise<void> {
    const { id: userId } = params;

    try {
      const { data, ref } = await this.clientDb.query(
        this.faunadbQuery.Delete(
          this.faunadbQuery.Ref(this.faunadbQuery.Collection(this.faunaCollection), userId),
        ),
      ) as any as FaunadbRecordBaseFields<User>;

      return;
    } catch (e) {
      if (e.requestResult.statusCode === 404) {
        throw new NotFoundException('User not found');
      }

      throw new InternalServerErrorException(e);
    }
  }

}
