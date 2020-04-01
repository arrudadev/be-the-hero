import * as Knex from 'knex';

exports.up = async (knex: Knex): Promise<any> => knex.schema.createTable('ongs', (table: Knex.TableBuilder) => {
	table.string('id').primary();
	table.string('name').notNullable();
	table.string('email').notNullable();
	table.string('whatsapp').notNullable();
	table.string('city').notNullable();
	table.string('uf', 2).notNullable();
});

exports.down = async (knex: Knex): Promise<any> => knex.schema.dropTable('ongs');

