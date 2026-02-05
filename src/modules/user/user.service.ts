import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {CreateUserDto} from './dto/create-user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
 async createUser(dto:CreateUserDto) {
    const user = this.userRepository.create({
      email: dto.email,
      password_hash: dto.password, // later we’ll hash it
      name: dto.name,
    });

    return this.userRepository.save(user);
  }
}
