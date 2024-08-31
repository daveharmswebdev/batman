import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  loginUser,
} from '../controllers/userController';
import { validateSchema } from '../validators/validate';
import {
  createUserSchema,
  loginUserSchema,
} from '../validators/userValidators';

const router = Router();

router.get('/', getAllUsers);
router.post('/', validateSchema(createUserSchema), createUser);
router.post('/login', validateSchema(loginUserSchema), loginUser);

export default router;
