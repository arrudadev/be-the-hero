module.exports = {
	bail: true,
	clearMocks: true,
	globals: {
		'ts-jest': {
			tsConfig: '../../tsconfig.json',
		},
	},
	preset: 'ts-jest',
	testEnvironment: 'node',
};
