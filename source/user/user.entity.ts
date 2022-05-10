import { IsString, IsUUID } from 'class-validator';

import { Column, PrimaryGeneratedColumn } from '.pnpm/typeorm@0.3.6_pg@8.7.3/node_modules/typeorm';

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
export class User {

  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  public id: string; // Reference fauna collection ID

  @Column({ type: 'varchar', length: 120 })
  @IsString()
  public name: string;

  @Column({ type: 'varchar', length: 120 })
  @IsString()
  public email: string;

  constructor({ name, email }) {
    this.name = name;
    this.email = email;
  }

}
