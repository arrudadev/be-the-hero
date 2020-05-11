import { Request, Response } from 'express';

import connection from '../database/connection';

class ProfileController {
	async index(request: Request, response: Response): Promise<any> {
		const ong_id = request.headers.authorization;

		if (ong_id) {
			const incidents = await connection('incidents').where('ong_id', ong_id).select('*');
			return response.json(incidents);
		}

		return response.status(401).json({ error: 'Operation not permitted.' });
	}
}

export default new ProfileController();
