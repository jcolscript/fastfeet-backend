import { Router } from 'express';

// Middlewares
import auth from './app/middlewares/auth';

// Controllers
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';

// Validators
import Validators from './app/validators';

const routes = new Router();

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

export default routes;
