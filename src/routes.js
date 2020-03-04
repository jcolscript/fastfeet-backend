import { Router } from 'express';

// Controllers
import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';

// Validators
import SessionStoreValidator from './app/validators/SessionStoreValidator';

const routes = new Router();

routes.post('/sessions', SessionStoreValidator, SessionController.store);
routes.post('/recipients', RecipientsController.store);

export default routes;
