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

	beforeEach(async () => {
		await connection('incidents').truncate();
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

	it('should be able to list Incidents with pagination', async () => {
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

		await createNewIncident({
			title: 'Incident TEST',
			description: 'Incident teste description',
			value: 10,
		}, ONGId);

		// First request without send page number
		const response = await supertest(app)
			.get('/incidents');

		expect(response.body.length).toEqual(5);
		expect(String(response.header['x-total-count'])).toEqual('7');

		// Second request with send page number
		// Getting the second page
		const responseWithPageNumber = await supertest(app)
			.get('/incidents')
			.query({ page: 2 });

		expect(responseWithPageNumber.body.length).toEqual(2);
		expect(String(responseWithPageNumber.header['x-total-count'])).toEqual('7');
	});
});
