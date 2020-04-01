import express from 'express';

import IncidentController from './controllers/IncidentController';
import OngController from './controllers/OngController';

const routes = express.Router();

routes.get('/ongs', new OngController().index);

// routes.post('/ongs', new OngController().create);

routes.post('/incidents', new IncidentController().create);

export default routes;
