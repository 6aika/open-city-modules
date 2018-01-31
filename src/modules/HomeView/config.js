import defaultConfig from 'open-city-modules/src/modules/HomeView/config.json';

let config = defaultConfig;
export const configureHomeView = (configJSON) => {
  config = Object.assign(defaultConfig, configJSON);
};

const getConfig = () => config;
export { getConfig };
