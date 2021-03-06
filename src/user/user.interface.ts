import {ApiProperty ,SwaggerModule} from "@nestjs/swagger";
import { IsDate, IsEmail, IsNotEmpty, Length } from "class-validator";

export class UserCreateDto {
  @IsNotEmpty()
  @Length(2,20)
  @ApiProperty()
  name:string;
  @ApiProperty()
  surname:string;
  @ApiProperty()
  password:string;
  @ApiProperty()
  @IsEmail()
  email:string;
  @ApiProperty()
  createdAt:Date;
}

export class UserUpdateDto {
  @ApiProperty()
  name:string;
  @ApiProperty()
  surname:string;
  @ApiProperty()
  password:string;
  @ApiProperty()
  email:string;
  @ApiProperty()
  createdAt:Date;
}

export class UserLoginDto {
  @ApiProperty()
  email:string;
  @ApiProperty()
  password:string;
}

