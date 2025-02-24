import { Request, Response } from 'express';
import { Service } from 'typedi';
import { CreateUserUseCase } from '../../core/useCases/CreateUserUseCase';
import { IUserRepository } from '../../ports/out/IUserRepository';
import { IAddressRepository } from '../../ports/out/IAddressRepository';
import { ICompanyRepository } from '../../ports/out/ICompanyRepository';
import { IIndividualRepository } from '../../ports/out/IIndividualRepository';
import { MessagingService } from '../../core/services/MessagingService';

@Service()
export default class UserController {
  private createUserUseCase: CreateUserUseCase;

  constructor(
    private readonly userRepository: IUserRepository,
    private readonly addressRepository: IAddressRepository,
    private readonly companyRepository: ICompanyRepository,
    private readonly individualRepository: IIndividualRepository
  ) {
    const messagingService = new MessagingService();
    this.createUserUseCase = new CreateUserUseCase(
      this.userRepository,
      this.addressRepository,
      this.individualRepository,
      this.companyRepository,
      messagingService
    );
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      // Desestruture os campos comuns e específicos
      const {
        name,
        cpf,
        email,
        confirmEmail,
        mobile,
        phone,
        userType,
        termsAccepted,
        isActive,
        address,      // Para INDIVIDUAL
        addresses     // Para COMPANY: array de endereços
      } = req.body;

       //Valida campos obrigatórios básicos
      //if (!name || !email || !confirmEmail || !userType || !termsAccepted) {
      //  return res.status(400).json({ error: 'Missing required fields' });
      //}

      // Valida confirmação do email
      if (email !== confirmEmail) {
        return res.status(400).json({ error: 'Emails do not match' });
      }

      // Define valores padrão para isActive, caso não seja enviado
      const active = isActive !== undefined ? isActive : true;

      // Lógica condicional baseada no tipo de usuário
      if (userType === 'INDIVIDUAL') {
        // Para pessoa física, os campos obrigatórios são: cpf e address
        if (!cpf || !address) {
          return res.status(400).json({ error: 'Missing required fields for individual' });
        }
        // Chamamos o caso de uso com os dados de individual
        const user = await this.createUserUseCase.execute(
          '', // or generate a valid string ID
          name,
          false,   // isDeleted
          cpf,
          email,
          userType,
          address
        );
        return res.status(201).json(user);
      } else if (userType === 'COMPANY') {
        // Para empresa, os campos obrigatórios são: cnpj, responsibleCpf e addresses
        const { cnpj, responsibleCpf } = req.body;
        if (!cnpj || !responsibleCpf || !addresses || !Array.isArray(addresses) || addresses.length === 0) {
          return res.status(400).json({ error: 'Missing required fields for company' });
        }
        // Chamamos o caso de uso para COMPANY
        // Neste exemplo, assumimos que o caso de uso tratará os endereços de forma apropriada
        const user = await this.createUserUseCase.execute(
          '', // or generate a valid string ID
          name,
          false,    // isDeleted
          responsibleCpf,  // Para COMPANY, o campo "cpf" é usado para o responsável, conforme sua lógica
          email,
          userType,
          addresses[0]
        );
        return res.status(201).json(user);
      } else {
        return res.status(400).json({ error: 'Invalid userType' });
      }
    } catch (error: any) {
      console.error('Erro ao criar usuário:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userRepository.getUserById(req.params.id);
      if (user !== null) {
        return res.status(200).json(user);
      }
      return res.status(404).json({ message: 'User not found' });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  async getUserByEmail(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userRepository.getUserByEmail(req.params.email);
      if (user !== null) {
        return res.status(200).json(user);
      }
      return res.status(404).json({ message: 'User not found' });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const updated = await this.userRepository.update(req.params.id, req.body);
      if (updated) {
        const updatedUser = await this.userRepository.getUserById(req.params.id);
        return res.status(200).json(updatedUser);
      }
      return res.status(404).json({ message: 'User not found or not updated' });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const deletedCount = await this.userRepository.delete(req.params.id);
      if (deletedCount > 0) {
        return res.status(200).json({ message: 'User deleted successfully' });
      }
      return res.status(404).json({ message: 'User not found' });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
}