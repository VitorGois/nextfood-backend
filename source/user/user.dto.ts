/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {

  @IsString() @IsNotEmpty()
    nome: string;

  @IsString() @IsNotEmpty()
    email: string;

}
