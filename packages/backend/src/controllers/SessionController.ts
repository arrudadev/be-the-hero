import { Request, Response } from 'express';

import connection from '../database/connection';

class SessionController {
	async create(request: Request, response: Response): Promise<any> {
		const { id } = request.body;

		if (id) {
			const ong = await connection('ongs').where('id', id).select('name').first();

			if (!ong) {
				return response.status(400).json({ error: 'No ONG found with this ID' });
			}

			return response.json(ong);
		}

		return response.status(401).json({ error: 'Operation not permitted.' });
	}
}

export default new SessionController();
