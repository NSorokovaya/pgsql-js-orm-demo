import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // get all users
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  // get user by id
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User | undefined> {
    const result = this.usersService.findById(id);
    if (!result) {
      throw new HttpException(
        { error: 'Id is not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }

  // update user
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: any) {
    if (!Object.keys(updateUserDto).length) {
      throw new HttpException(
        { error: 'Please provide fields to update' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.usersService.updateUser(id, updateUserDto);
    return { data: result };
  }
  //get permission

  @Get(':id/permissions')
  async getUserPermission(@Param('id') id: string) {
    const user = await this.usersService.getUserPermission(id);
    if (!user) {
      throw new HttpException(
        { error: 'user is not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return { data: user };
  }
}
