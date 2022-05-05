import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
export class User {

  @IsNumberString()
  public id: string; // Reference fauna collection ID

  @IsString() @IsNotEmpty()
  public name: string;

  @IsString() @IsNotEmpty()
  public email: string;

  constructor({ name, email }) {
    this.name = name;
    this.email = email;
  }

}
