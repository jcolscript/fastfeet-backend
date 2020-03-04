import { Router } from 'express';
// Middlewares
import auth from './app/middlewares/auth';

// Controllers
import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';

// Validators
import SessionStoreValidator from './app/validators/SessionStoreValidator';

const routes = new Router();

routes.post('/sessions', SessionStoreValidator, SessionController.store);
routes.post('/recipients', auth, RecipientsController.store);

export default routes;
