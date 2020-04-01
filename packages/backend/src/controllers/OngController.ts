import { Request, Response } from 'express';

// import * as crypto from 'crypto';

import connection from '../database/connection';

class OngController {
	async index(request: Request, response: Response): Promise<any> {
		const ongs = await connection('ongs').select('*');
		const teste = request.headers;
		console.log(teste);

		return response.json(ongs);
	}

	// async create(request: Request, response: Response): Promise<any> {
	// 	const {
	// 		name, email, whatsapp, city, uf,
	// 	} = request.body;

	// 	const id = crypto.randomBytes(4).toString('HEX');

	// 	await connection('ongs').insert({
	// 		id,
	// 		name,
	// 		email,
	// 		whatsapp,
	// 		city,
	// 		uf,
	// 	});

	// 	response.json({ id });
	// }
}

export default OngController;
