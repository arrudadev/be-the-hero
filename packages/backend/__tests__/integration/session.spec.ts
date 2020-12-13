import supertest from 'supertest';

import app from '../../src/app';
import connection from '../../src/database/connection';

interface NewOngOptions {
    name: string,
    email: string,
    whatsapp: string,
    city: string,
    uf: string,
}

describe('Profile', () => {
	const createNewONG = async (options: NewOngOptions): Promise<supertest.Response> => supertest(app)
		.post('/ongs')
		.send(options);

	let ONGId;

	beforeAll(async () => {
		await connection.migrate.rollback();
		await connection.migrate.latest();

		const response = await createNewONG({
			name: 'ONG TEST',
			email: 'test@test.com.br',
			whatsapp: '11912345678',
			city: 'São Paulo',
			uf: 'SP',
		});

		ONGId = response.body.id;
	});

	afterAll(async () => {
		await connection.destroy();
	});

	it('should be able to login', async () => {
		const response = await supertest(app)
			.post('/sessions')
			.send({
				id: ONGId,
			});

		expect(response.body).toHaveProperty('name');
	});

	it('should not be able to login when ong id is not found', async () => {
		const response = await supertest(app)
			.post('/sessions')
			.send({
				id: '123123123',
			});

		expect(response.status).toBe(400);
	});
});
