import express, { Request, Response } from 'express';

import packageJson from '../package.json';
import IncidentController from './controllers/IncidentController';
import OngController from './controllers/OngController';
import ProfileController from './controllers/ProfileController';
import SessionController from './controllers/SessionController';
import IncidentValidator from './validators/IncidentValidator';
import OngValidator from './validators/OngValidator';
import ProfileValidator from './validators/ProfileValidator';
import SessionValidator from './validators/SessionValidator';

const routes = express.Router();

routes.get('/version', (request: Request, response: Response) => response.json({ version: packageJson.version }));

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngValidator.createValidate(), OngController.create);

routes.get('/incidents', IncidentValidator.indexValidate(), IncidentController.index);
routes.post('/incidents', IncidentValidator.createValidate(), IncidentController.create);
routes.delete('/incidents/:id', IncidentValidator.deleteValidate(), IncidentController.delete);

routes.get('/profile', ProfileValidator.indexValidate(), ProfileController.index);

routes.post('/sessions', SessionValidator.createValidate(), SessionController.create);

export default routes;
