import defaultConfig from 'open-city-modules/src/modules/LinkedEvents/config.json';

let config = defaultConfig;
export const configureFeedback = (configJSON) => {
  config = Object.assign(defaultConfig, configJSON);
};

const getConfig = () => config;
export { getConfig };
