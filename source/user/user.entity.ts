import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
    id: number;

  @Column()
    name: string;

  @Column()
    email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

}
