import { IsNotEmpty, IsString } from 'class-validator';
import { userSignInDto } from './user.siginDto';

export class userSignUpDto extends userSignInDto {
  @IsNotEmpty({ message: 'Name can not be null' })
  @IsString({ message: 'Name should be string' })
  name: string;
}
