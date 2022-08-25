interface IConfig {
  commonServiceHost: string;
  productCode: string;
  env: 'prod' | 'staging' | 'dev' | 'test'; // | 'api-test' | 'press';
  cdnHost: string;
}

const config: IConfig = {
  commonServiceHost: 'http://backend-api-02.newbee.ltd/manage-api/v1',
  productCode: 'newbee',
  env: 'dev',
  cdnHost: 'https://up.qbox.me',
};

export function getCurrentEnvironment() {
  const meta = window.document.querySelector('meta[name=environment]');
  if (meta) {
    const env = meta.getAttribute('content');
    if (env && env !== '__ENVIRONMENT__' && env !== 'undefined') {
      return env;
    }
  }
  const { hostname } = window.location;
  if (hostname.startsWith('dev')) {
    return 'development';
  } else if (hostname.startsWith('test')) {
    return 'test';
  } else if (hostname.startsWith('staging')) {
    return 'staging';
  } else if (hostname.endsWith('.codemao.cn')) {
    return 'production';
  } else if (hostname.endsWith('.codingcat.com')) {
    return 'intl-production'; // NOTE: 海外只有一个正式环境
  } else {
    return 'development';
  }
}

export function initializeConfig(environment: string) {
  let env: IConfig['env'];

  switch (environment) {
    case 'press':
    case 'pressure':
    case 'test':
      env = 'test';
      break;
    case 'staging':
      env = 'staging';
      break;
    case 'prod':
    case 'production':
      env = 'prod';
      break;
    case 'dev':
    case 'development':
    default:
      env = 'dev';
      break;
  }

  // config.commonServiceHost = `http://${apiHostPrefix}backend-api-02.newbee.ltd/manage-api/v1`;
  config.commonServiceHost = `http://backend-api-02.newbee.ltd/manage-api/v1`;
  config.env = env;

  return config;
}

export function isDevTest() {
  return config.env === 'dev' || config.env === 'test';
}

initializeConfig(getCurrentEnvironment());
export default config;
