import knex from 'knex';

// eslint-disable-next-line
// @ts-ignore
import configuration from '../../knexfile';

const knexConfiguration = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

const connection = knex(knexConfiguration);

export default connection;
