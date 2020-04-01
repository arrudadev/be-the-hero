import * as Knex from 'knex';

exports.up = async (knex: Knex): Promise<any> => knex.schema.createTable('incidents', (table: Knex.TableBuilder) => {
	table.increments();

	table.string('title').notNullable();
	table.string('description').notNullable();
	table.decimal('value').notNullable();

	table.string('ong_id').notNullable();

	// Foreign Key
	table.foreign('ong_id').references('id').inTable('ongs');
});

exports.down = async (knex: Knex): Promise<any> => knex.schema.dropTable('incidents');

