import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userSignUpDto } from './dto/user.signup.dto';
import { UserEntity } from './entities/user.entity';
import { userSignInDto } from './dto/user.siginDto';
import { currentUser } from './utility/decorators/current.user.decorator';
import { AuthenticationGuard } from './utility/guards/authentication.guard';

import { Roles } from './utility/user.roles.enum';
import { AuthorizeGuard } from './utility/guards/authorization.guard';
import { AuthorizeRoles } from './utility/decorators/authorize.roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(
    @Body() userSignUp: userSignUpDto,
  ): Promise<{ user: UserEntity }> {
    return { user: await this.usersService.signup(userSignUp) };
  }
  @Post('signin')
  async signin(@Body() userSignInDto: userSignInDto): Promise<{
    accessToken: string;
    user: UserEntity;
  }> {
    const user = await this.usersService.signin(userSignInDto);
    const accessToken = await this.usersService.accessToken(user);
    return { accessToken, user };
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return 'hi';
  // }

  //@AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Get('all')
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Get('me')
  getProfile(@currentUser() currentUser: UserEntity) {
    return currentUser;
  }
}
