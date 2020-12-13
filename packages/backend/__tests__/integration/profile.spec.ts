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

interface NewIncidentOptions {
    title: string,
    description: string,
    value: number,
}

describe('Session', () => {
	const createNewONG = async (options: NewOngOptions): Promise<supertest.Response> => supertest(app)
		.post('/ongs')
		.send(options);

	const createNewIncident = async (options: NewIncidentOptions, authorization: string): Promise<supertest.Response> => supertest(app)
		.post('/incidents')
		.set('Authorization', authorization)
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

		await createNewIncident({
			title: 'Incident TEST',
			description: 'Incident teste description',
			value: 10,
		}, ONGId);

		await createNewIncident({
			title: 'Incident TEST',
			description: 'Incident teste description',
			value: 10,
		}, ONGId);
	});

	afterAll(async () => {
		await connection.destroy();
	});

	it('should be able to list all incidents of the ong', async () => {
		const response = await supertest(app)
			.get('/profile')
			.set('Authorization', ONGId);

		expect(response.body).toHaveLength(2);
		expect(response.body[0]).toHaveProperty('title');
		expect(response.body[0]).toHaveProperty('description');
		expect(response.body[0]).toHaveProperty('value');

		expect(response.body[1]).toHaveProperty('title');
		expect(response.body[1]).toHaveProperty('description');
		expect(response.body[1]).toHaveProperty('value');
	});

	it('should not be able to list incidents of the ong when authorization is not correct', async () => {
		const response = await supertest(app)
			.get('/profile');

		expect(response.status).toBe(400);
	});
});
