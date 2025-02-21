import { Router, Request, Response } from 'express';

const router = Router();

router.get('/users', (req, res) => {
  res.send('Get all users');
});

router.post('/users', (req, res) => {
  // Assume validation is handled in a middleware or service layer
  res.send('Create a new user');
});

router.put('/users/:id', (req, res) => {
  res.send(`Update user with ID ${req.params.id}`);
});

router.delete('/users/:id', (req, res) => {
  res.send(`Logically delete user with ID ${req.params.id}`);
});

export default router;
