import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

/**
 * This dto is used to control user inputs and make sure it is valid data to create locations.
 * If the input provided to the endpoint does not match the rules defined by decorators here,
 * the endpoint will immediately return an error.
 * More info here: https://docs.nestjs.com/techniques/validation
 */

/**
 * TODO implement
 */
export class CreateLocationDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  location: string;

  @IsString()
  picture: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stars: number;

  @IsNumber()
  numberOfRooms: number;

  @IsNumber()
  categoryId: number;
}

export class UpdateLocationDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  location: string;

  @IsString()
  picture: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stars: number;

  @IsNumber()
  numberOfRooms: number;

  @IsNumber()
  categoryId: number;
}

export class ChangeLocationPriceDto {
  @IsNumber()
  price: number;
}
