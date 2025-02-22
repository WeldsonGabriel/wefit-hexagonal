import { Router, Request, Response } from 'express';
import UserController from '../controllers/UserController'; // Ajuste o caminho conforme necessário

const router = Router();

// Rota para criar um usuário
router.post('/users', async (req: Request, res: Response) => {
  try {
    await UserController.createUser(req, res);
  } catch (error: any) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: error.message });
  }
});

// Rota para obter um usuário por ID
router.get('/users/:id', async (req: Request, res: Response) => {
  try {
    await UserController.getUserById(req, res);
  } catch (error: any) {
    console.error('Erro ao obter usuário:', error);
    res.status(500).json({ error: error.message });
  }
});

// Rota para obter um usuário por email
router.get('/users/email/:email', async (req: Request, res: Response) => {
  try {
    await UserController.getUserByEmail(req, res);
  } catch (error: any) {
    console.error('Erro ao obter usuário:', error);
    res.status(500).json({ error: error.message });
  }
});

// Rota para atualizar um usuário
router.put('/users/:id', async (req: Request, res: Response) => {
  try {
    await UserController.updateUser(req, res);
  } catch (error: any) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: error.message });
  }
});

// Rota para deletar um usuário
router.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    await UserController.deleteUser(req, res);
  } catch (error: any) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;