import express, { Request, Response } from 'express';

const routes = express.Router();

routes.get('/users', (request: Request, response: Response) => response.json({
	evento: 'Semana OmniStack 11.0',
	aluno: 'Alexandre Monteiro Teste',
}));

export default routes;
