import { Router } from 'express';
import { register, login } from '../lib/auth';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const result = await register(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : 'Something went wrong',
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const result = await login(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : 'Something went wrong',
    });
  }
});

export default router;
