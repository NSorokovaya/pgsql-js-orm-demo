import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // get all users
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  // get user by id
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User | undefined> {
    console.log(id);
    return this.usersService.findById(id);
  }

  // update user
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: any) {
    try {
      const result = await this.usersService.updateUser(id, updateUserDto);
      return { data: result };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //get permission

  @Get(':id/permissions')
  async getUserPermission(@Param('id') id: string) {
    try {
      const user = await this.usersService.getUserPermission(id);
      return { data: user };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
