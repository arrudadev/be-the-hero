import { Request, Response } from 'express';

import connection from '../database/connection';

class IncidentController {
	async create(request: Request, response: Response): Promise<any> {
		const { title, description, value } = request.body;

		const ong_id = request.headers.authorization;

		const [id] = await connection('incidents').insert({
			title,
			description,
			value,
			ong_id,
		});

		return response.json({ id });
	}
}

export default new IncidentController();
