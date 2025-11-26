import { Router } from 'express';
import * as credentialController from '../controllers/credentialController';
import { validateSchema } from '../middlewares/validationMiddleware';
import { credentialSchema } from '../schemas/credentialSchemas';
import { authenticateToken } from '../middlewares/authMiddleware';
import { validateIdParam } from '../middlewares/validateParamsMiddleware';

const credentialRouter = Router();

credentialRouter.use(authenticateToken);

credentialRouter.post(
  '/credentials',
  validateSchema(credentialSchema),
  credentialController.createCredential
);

credentialRouter.get('/credentials', credentialController.getAllCredentials);

credentialRouter.get(
  '/credentials/:id',
  validateIdParam,
  credentialController.getCredential
);

credentialRouter.put(
  '/credentials/:id',
  validateIdParam,
  validateSchema(credentialSchema),
  credentialController.updateCredential
);

credentialRouter.delete(
  '/credentials/:id',
  validateIdParam,
  credentialController.deleteCredential
);

export default credentialRouter;






