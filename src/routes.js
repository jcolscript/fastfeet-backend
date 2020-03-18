import { Router } from 'express';
import multer from 'multer';

// Configs
import multerConfig from './config/multer';

// Controllers
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';

// Middlewares
import auth from './app/middlewares/auth';

// Validators
import Validators from './app/validators';

const routes = new Router();
const upload = multer(multerConfig);

// Sessions
routes.post('/sessions', Validators.sessionStore, SessionController.store);

// Recipients
routes.post('/recipients', auth, Validators.recipientStore, RecipientController.store);

// Deliverymen
routes.get('/deliverymen', auth, DeliverymanController.index);
routes.post(
  '/deliverymen',
  auth,
  Validators.deliverymanStore,
  DeliverymanController.store
);
routes.put('/deliverymen', auth, DeliverymanController.update);
routes.delete('/deliverymen/:id', auth, DeliverymanController.delete);

// Files
routes.post('/files', auth, upload.single('file'), FileController.store);

export default routes;
