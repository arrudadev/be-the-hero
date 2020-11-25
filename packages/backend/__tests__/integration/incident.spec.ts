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

describe('Incident', () => {
	const createNewONG = async (options: NewOngOptions): Promise<supertest.Response> => supertest(app)
		.post('/ongs')
		.send(options);

	const createNewIncident = async (options: NewIncidentOptions, authorization: string): Promise<supertest.Response> => supertest(app)
		.post('/incidents')
		.set('Authorization', authorization)
		.send(options);

	let ONGId;

	beforeEach(async () => {
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

	it('should be able to create a new Incident', async () => {
		const response = await createNewIncident({
			title: 'Incident TEST',
			description: 'Incident teste description',
			value: 10,
		}, ONGId);

		expect(response.body).toHaveProperty('id');
	});
});
