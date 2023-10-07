import { IsString } from "class-validator";

export class CreateUserDto {
  username: string;
  password: string;
  email: string;
}
export class signindto {
  password: string;
  email: string;
}

export class valididto {
    @IsString()
  id: string;
}
