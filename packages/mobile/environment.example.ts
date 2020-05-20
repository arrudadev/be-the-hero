import Constants from 'expo-constants';

const ENV = {
	development: {
		apiUrl: '',
	},
	staging: {
		apiUrl: '',
	},
	production: {
		apiUrl: '',
	},
};

const getEnvVars = (env = Constants.manifest.releaseChannel): any => {
	let environment;
	// What is __DEV__ ?
	// This variable is set to true when react-native is running in Dev mode.
	// __DEV__ is true when run locally, but false when published.
	// eslint-disable-next-line
	if (__DEV__) {
		environment = ENV.development;
	} if (env === 'staging') {
		environment = ENV.staging;
	} if (env === 'production') {
		environment = ENV.production;
	}
	return environment;
};

export default getEnvVars;
