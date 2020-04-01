import knex from 'knex';

// eslint-disable-next-line
// @ts-ignore
import configuration from '../../knexfile';

const connection = knex(configuration.development);

export default connection;
