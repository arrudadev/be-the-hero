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

describe('ONG', () => {
	const createNewONG = async (options: NewOngOptions): Promise<supertest.Response> => supertest(app)
		.post('/ongs')
		.send(options);

	beforeEach(async () => {
		await connection.migrate.rollback();
		await connection.migrate.latest();
	});

	afterAll(async () => {
		await connection.destroy();
	});

	it('should be able to create a new ONG', async () => {
		const response = await createNewONG({
			name: 'ONG TEST',
			email: 'test@test.com.br',
			whatsapp: '11912345678',
			city: 'São Paulo',
			uf: 'SP',
		});
		expect(response.body).toHaveProperty('id');
		expect(response.body.id).toHaveLength(8);
	});

	it('should be able to list all ONGs', async () => {
		await createNewONG({
			name: 'ONG 01',
			email: 'ong01@test.com.br',
			whatsapp: '11111111111',
			city: 'São Paulo',
			uf: 'SP',
		});

		await createNewONG({
			name: 'ONG 02',
			email: 'ong02@test.com.br',
			whatsapp: '22222222222',
			city: 'São Paulo',
			uf: 'SP',
		});

		const response = await supertest(app)
			.get('/ongs');

		expect(response.body).toHaveLength(2);
		expect(response.body[0]).toHaveProperty('name');
		expect(response.body[0]).toHaveProperty('email');
		expect(response.body[0]).toHaveProperty('whatsapp');
		expect(response.body[0]).toHaveProperty('city');
		expect(response.body[0]).toHaveProperty('uf');

		expect(response.body[1]).toHaveProperty('name');
		expect(response.body[1]).toHaveProperty('email');
		expect(response.body[1]).toHaveProperty('whatsapp');
		expect(response.body[1]).toHaveProperty('city');
		expect(response.body[1]).toHaveProperty('uf');
	});

	describe('validations', () => {
		it('should validate that no invalid parameters were passed when creating the ONG', async () => {
			const response = await supertest(app)
				.post('/ongs')
				.send({
					name: 'test',
					email: 'ong02@test.com.br',
					whatsapp: '22222222222',
					city: 'São Paulo',
					uf: 'SP',
					invalidParameter: 'test',
				});
			expect(response.status).toBe(400);
			expect(response.body.statusCode).toBe(400);
		});

		describe('name', () => {
			it('should validate whether the ONG name was passed in request body', async () => {
				const response = await supertest(app)
					.post('/ongs')
					.send({
						email: 'ong02@test.com.br',
						whatsapp: '22222222222',
						city: 'São Paulo',
						uf: 'SP',
					});
				expect(response.status).toBe(400);
				expect(response.body.statusCode).toBe(400);
			});

			it('should validate whether the ONG name is not empty', async () => {
				const response = await supertest(app)
					.post('/ongs')
					.send({
						name: '',
						email: 'ong02@test.com.br',
						whatsapp: '22222222222',
						city: 'São Paulo',
						uf: 'SP',
					});
				expect(response.status).toBe(400);
				expect(response.body.statusCode).toBe(400);
			});

			it('should validate whether the ONG name is a string', async () => {
				const response = await supertest(app)
					.post('/ongs')
					.send({
						name: 123123,
						email: 'ong02@test.com.br',
						whatsapp: '22222222222',
						city: 'São Paulo',
						uf: 'SP',
					});
				expect(response.status).toBe(400);
				expect(response.body.statusCode).toBe(400);
			});
		});

		describe('email', () => {
			it('should validate whether the ONG email was passed in request body', async () => {
				const response = await supertest(app)
					.post('/ongs')
					.send({
						name: 'ONG test',
						whatsapp: '22222222222',
						city: 'São Paulo',
						uf: 'SP',
					});
				expect(response.status).toBe(400);
				expect(response.body.statusCode).toBe(400);
			});

			it('should validate whether the ONG email is not empty', async () => {
				const response = await supertest(app)
					.post('/ongs')
					.send({
						name: 'ONG test',
						email: '',
						whatsapp: '22222222222',
						city: 'São Paulo',
						uf: 'SP',
					});
				expect(response.status).toBe(400);
				expect(response.body.statusCode).toBe(400);
			});

			it('should validate whether the ONG email is a string', async () => {
				const response = await supertest(app)
					.post('/ongs')
					.send({
						name: 'ONG test',
						email: 123123,
						whatsapp: '22222222222',
						city: 'São Paulo',
						uf: 'SP',
					});
				expect(response.status).toBe(400);
				expect(response.body.statusCode).toBe(400);
			});

			it('should validate whether the ONG email is in a valid format', async () => {
				const response = await supertest(app)
					.post('/ongs')
					.send({
						name: 'ONG test',
						email: 'invalidEmail',
						whatsapp: '22222222222',
						city: 'São Paulo',
						uf: 'SP',
					});
				expect(response.status).toBe(400);
				expect(response.body.statusCode).toBe(400);
			});
		});

		describe('whatsapp', () => {
			it('should validate whether the ONG whatsapp was passed in request body', async () => {
				const response = await supertest(app)
					.post('/ongs')
					.send({
						name: 'ONG test',
						email: 'ong02@test.com.br',
						city: 'São Paulo',
						uf: 'SP',
					});
				expect(response.status).toBe(400);
				expect(response.body.statusCode).toBe(400);
			});

			it('should validate whether the ONG whatsapp is not empty', async () => {
				const response = await supertest(app)
					.post('/ongs')
					.send({
						name: 'ONG test',
						email: 'ong02@test.com.br',
						whatsapp: '',
						city: 'São Paulo',
						uf: 'SP',
					});
				expect(response.status).toBe(400);
				expect(response.body.statusCode).toBe(400);
			});
		});

		describe('city', () => {
			it('should validate whether the ONG city was passed in request body', async () => {
				const response = await supertest(app)
					.post('/ongs')
					.send({
						name: 'ONG test',
						email: 'ong02@test.com.br',
						whatsapp: '22222222222',
						uf: 'SP',
					});
				expect(response.status).toBe(400);
				expect(response.body.statusCode).toBe(400);
			});

			it('should validate whether the ONG city is not empty', async () => {
				const response = await supertest(app)
					.post('/ongs')
					.send({
						name: 'ONG test',
						email: 'ong02@test.com.br',
						whatsapp: '22222222222',
						city: '',
						uf: 'SP',
					});
				expect(response.status).toBe(400);
				expect(response.body.statusCode).toBe(400);
			});

			it('should validate whether the ONG city is a string', async () => {
				const response = await supertest(app)
					.post('/ongs')
					.send({
						name: 'ONG test',
						email: 'ong02@test.com.br',
						whatsapp: '22222222222',
						city: 13241234123,
						uf: 'SP',
					});
				expect(response.status).toBe(400);
				expect(response.body.statusCode).toBe(400);
			});
		});

		describe('uf', () => {
			it('should validate whether the ONG uf was passed in request body', async () => {
				const response = await supertest(app)
					.post('/ongs')
					.send({
						name: 'ONG test',
						email: 'ong02@test.com.br',
						whatsapp: '22222222222',
						city: 'São Paulo',
					});
				expect(response.status).toBe(400);
				expect(response.body.statusCode).toBe(400);
			});

			it('should validate whether the ONG uf is not empty', async () => {
				const response = await supertest(app)
					.post('/ongs')
					.send({
						name: 'ONG test',
						email: 'ong02@test.com.br',
						whatsapp: '22222222222',
						city: 'São Paulo',
						uf: '',
					});
				expect(response.status).toBe(400);
				expect(response.body.statusCode).toBe(400);
			});

			it('should validate whether the ONG uf is a string', async () => {
				const response = await supertest(app)
					.post('/ongs')
					.send({
						name: 'ONG test',
						email: 'ong02@test.com.br',
						whatsapp: '22222222222',
						city: 'São Paulo',
						uf: 12,
					});
				expect(response.status).toBe(400);
				expect(response.body.statusCode).toBe(400);
			});

			it('should validate that the ONG uf is 2 characters long', async () => {
				const response = await supertest(app)
					.post('/ongs')
					.send({
						name: 'ONG test',
						email: 'ong02@test.com.br',
						whatsapp: '22222222222',
						city: 'São Paulo',
						uf: 'asdfasdfasdf',
					});
				expect(response.status).toBe(400);
				expect(response.body.statusCode).toBe(400);
			});
		});
	});
});
