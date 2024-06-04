import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  async findById(id: string): Promise<User | undefined> {
    console.log(id);
    return this.usersRepository.findOne({ where: { id } });
  }

  async updateUser(id: string, updateUserDto: any): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);
    const updatedUser = await this.usersRepository.findOne({ where: { id } });
    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return updatedUser;
  }

  async getUserPermission(id: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
        relations: [
          'user_roles',
          'user_roles.role',
          'user_roles.role.role_permissions',
          'user_roles.role.role_permissions.permission',
        ],
      });

      return user;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
