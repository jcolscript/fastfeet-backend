import { Router } from 'express';

// Controllers
import SessionController from './app/controllers/SessionController';

// Validators
import SessionStoreValidator from './app/validators/SessionStoreValidator';

const routes = new Router();

routes.post('/sessions', SessionStoreValidator, SessionController.store);

export default routes;
