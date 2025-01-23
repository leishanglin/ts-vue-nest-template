import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { omit } from 'lodash';

type NonPasswordUser = Omit<User, 'password'>;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<NonPasswordUser[]> {
    const users = await this.userRepository.find();
    return users.map((user) => omit(user, ['password']));
  }

  async findOneById(id: string): Promise<NonPasswordUser> {
    const item = await this.userRepository.findOneBy({ id });
    return omit(item, ['password']);
  }

  async getPasswordById(id: string): Promise<string> {
    const item = await this.userRepository.findOneBy({ id });
    return item.password;
  }
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<NonPasswordUser> {
    await this.userRepository.update(id, updateUserDto);
    return this.findOneById(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  checkExist(user: Partial<User>) {
    return this.userRepository.existsBy(user);
  }

  findOneByName(name: User['name']) {
    return this.userRepository.findOneBy({ name });
  }

  updatePassword(id: number, newPassword: string) {
    this.userRepository.update(id, { password: newPassword });
  }
}
