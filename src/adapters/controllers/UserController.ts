import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../core/useCases/CreateUserUseCase';
import { UpdateUserUseCase } from '../../core/useCases/UpdateUserUseCase';
import { DeleteUserUseCase } from '../../core/useCases/DeleteUserUseCase';
import { UserMapper } from '../mappers/UserMapper';
import { User } from '../../core/entities/User';


