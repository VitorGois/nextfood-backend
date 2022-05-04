import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class RestaurantCreateDto {

  @IsString() @IsNotEmpty()
  public name: string;

  @IsString() @IsNotEmpty()
  public description: string;

  @IsString() @IsNotEmpty() @IsOptional()
  public categories?: string;

}

export class RestaurantReadByIdDto {

  @IsNumberString()
  public id: string;

}

export class RestaurantDeleteByIdDto {

  @IsNumberString()
  public id: string;

}
