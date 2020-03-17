import { Router } from 'express';

// Middlewares
import auth from './app/middlewares/auth';

// Controllers
import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';

// Validators
import Validators from './app/validators';

const routes = new Router();

// Sessions
routes.post('/sessions', Validators.sessionStore, SessionController.store);

// Recipients
routes.post('/recipients', auth, Validators.recipientStore, RecipientsController.store);

export default routes;
