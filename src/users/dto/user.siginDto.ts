import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class userSignInDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Pleae provide a valid email' })
  email: string;

  @IsNotEmpty({ message: 'Password can not be empty' })
  @MinLength(5, { message: 'Password minimum character should be 5.' })
  password: string;
}
