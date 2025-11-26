import { Router } from 'express';
import * as authController from '../controllers/authController';
import { validateSchema } from '../middlewares/validationMiddleware';
import { signUpSchema, signInSchema } from '../schemas/authSchemas';
import { authenticateToken } from '../middlewares/authMiddleware';

const authRouter = Router();

authRouter.post('/sign-up', validateSchema(signUpSchema), authController.signUp);
authRouter.post('/sign-in', validateSchema(signInSchema), authController.signIn);
authRouter.delete('/erase', authenticateToken, authController.deleteAccount);

export default authRouter;



