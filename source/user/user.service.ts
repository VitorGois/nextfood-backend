import { Inject, Injectable } from '@nestjs/common';
import * as faunadb from 'faunadb';

import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {

  private faunadbQuery = faunadb.query;

  public constructor(
    @Inject('DATABASE_CONNECTION') private readonly clientDb: faunadb.Client,
  ) { }

  /**
   * Create a user.
   * @param params
   */
  public async createUser(params: CreateUserDto): Promise<any> {
    return this.clientDb.query(
      this.faunadbQuery.Create(
        this.faunadbQuery.Collection('user'),
        {
          data: params,
        },
      ),
    );
  }

}
