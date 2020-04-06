import express from 'express';

import IncidentController from './controllers/IncidentController';
import OngController from './controllers/OngController';

const routes = express.Router();

routes.get('/ongs', OngController.index);

routes.post('/ongs', OngController.create);

routes.post('/incidents', IncidentController.create);

export default routes;
