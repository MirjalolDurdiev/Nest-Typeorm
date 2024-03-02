import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { userSignUpDto } from './dto/user.signup.dto';
import { hash, compare } from 'bcrypt';
import { userSignInDto } from './dto/user.siginDto';
import { sign } from 'jsonwebtoken';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private UsersRepository: Repository<UserEntity>,
  ) {}

  async signup(userSignUpDto: userSignUpDto): Promise<UserEntity> {
    const UserExists = await this.findUserByEmail(userSignUpDto.email);
    if (UserExists) throw new BadRequestException('Email does not exist!');
    userSignUpDto.password = await hash(userSignUpDto.password, 10);
    let user = this.UsersRepository.create(userSignUpDto);
    user = await this.UsersRepository.save(user);
    delete user.password;
    return user;
  }

  async signin(userSignInDto: userSignInDto): Promise<UserEntity> {
    const UserExists = await this.UsersRepository.createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=:email', { email: userSignInDto.email })
      .getOne();

    if (!UserExists) throw new BadRequestException('Bad credentials');
    const matchPassword = await compare(
      userSignInDto.password,
      UserExists.password,
    );
    if (!matchPassword) throw new BadRequestException('Bad credentials');
    delete UserExists.password;
    return UserExists;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.UsersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.UsersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email: string) {
    return await this.UsersRepository.findOneBy({ email: email });
  }
  async accessToken(user: UserEntity): Promise<string> {
    return sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEn_EXPIRE_TIME },
    );
  }
}

export default UsersService;
