import { User } from '../entities/User';
import { IUserRepository } from '../../ports/out/IUserRepository';

export class FindUserUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(id_usuario: string): Promise<User | null> {
    return await this.userRepository.findById(id_usuario);
  }
}
