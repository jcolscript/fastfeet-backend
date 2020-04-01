import { Router } from 'express';
import multer from 'multer';

// Configs
import multerConfig from './config/multer';

// Controllers
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import OrderController from './app/controllers/OrderController';
import StartDeliveryController from './app/controllers/StartDeliveryController';
import FinishDeliveryController from './app/controllers/FinishDeliveryController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryProblemsController from './app/controllers/DeliveryProblemsController';

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
routes.put('/recipients/:id', auth, RecipientController.update);

// Deliverymen
routes.get('/deliverymen', auth, DeliverymanController.index);
routes.post(
  '/deliverymen',
  auth,
  Validators.deliverymanStore,
  DeliverymanController.store
);
routes.put('/deliverymen/:id', auth, DeliverymanController.update);
routes.delete('/deliverymen/:id', auth, DeliverymanController.delete);
routes.get('/deliverymen/:id/deliveries', DeliveryController.index);

// Orders
routes.get('/orders', auth, OrderController.index);
routes.post('/orders', auth, OrderController.store);
routes.put('/orders/:id', auth, OrderController.update);
routes.delete('/orders/:id', auth, OrderController.delete);
routes.put('/orders/:orderId/start', StartDeliveryController.update);
routes.put('/orders/:orderId/finish', FinishDeliveryController.update);

// Problemns in Deliveries
routes.get('/deliveries/problems', auth, DeliveryProblemsController.index);
routes.get('/delivery/:id/problems', DeliveryProblemsController.show);
routes.post('/delivery/:id/problems', DeliveryProblemsController.store);

// Files
routes.post('/files/signature', upload.single('file'), FileController.store);
routes.post('/files', auth, upload.single('file'), FileController.store);

export default routes;
