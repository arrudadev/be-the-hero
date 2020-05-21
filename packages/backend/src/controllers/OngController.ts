import { Request, Response } from 'express';

import connection from '../database/connection';
import generateUniqueId from '../utils/generateUniqueId';

class OngController {
	async index(request: Request, response: Response): Promise<any> {
		const ongs = await connection('ongs').select('*');
		return response.json(ongs);
	}

	async create(request: Request, response: Response): Promise<any> {
		const { name, email, whatsapp, city, uf } = request.body;

		const id = generateUniqueId();

		await connection('ongs').insert({
			id,
			name,
			email,
			whatsapp,
			city,
			uf,
		});

		return response.json({ id });
	}
}

export default new OngController();
