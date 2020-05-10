import express, { Request, Response } from 'express';

import packageJson from '../package.json';
import IncidentController from './controllers/IncidentController';
import OngController from './controllers/OngController';

const routes = express.Router();

routes.get('/version', (request: Request, response: Response) => response.json({ version: packageJson.version }));

routes.get('/ongs', OngController.index);

routes.post('/ongs', OngController.create);

routes.post('/incidents', IncidentController.create);

export default routes;
