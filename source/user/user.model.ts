import { IsInt, IsNotEmpty, IsString } from 'class-validator';

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
export class User {

  @IsInt() @IsNotEmpty()
    id: number;

  @IsString() @IsNotEmpty()
    name: string;

  @IsString() @IsNotEmpty()
    email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

}
