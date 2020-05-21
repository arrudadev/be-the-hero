import supertest from 'supertest';

import app from '../../src/app';
import connection from '../../src/database/connection';

describe('ONG', () => {
	beforeEach(async () => {
		await connection.migrate.rollback();
		await connection.migrate.latest();
	});

	afterAll(async () => {
		await connection.destroy();
	});

	it('should be able to create a new ONG', async () => {
		const response = await supertest(app)
			.post('/ongs')
			.send({
				name: 'ONG TESTE',
				email: 'teste@teste.com.br',
				whatsapp: '11912345678',
				city: 'São Paulo',
				uf: 'SP',
			});
		expect(response.body).toHaveProperty('id');
		expect(response.body.id).toHaveLength(8);
	});
});
