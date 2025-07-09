import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/users.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { validateBody } from '../middlewares/validate.middleware.js';
import { userSchema } from '../validators/user.validator.js';

const router = Router();

router.get('/', authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getUserById);
router.post('/create', validateBody(userSchema), createUser); // sin token
router.put('/:id', authMiddleware, validateBody(userSchema), updateUser);
router.delete('/:id', authMiddleware, deleteUser);

export default router;
