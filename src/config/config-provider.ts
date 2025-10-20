import {config} from './config.js';
import {injectable} from 'inversify';

@injectable()
export class ConfigProvider {
  get port() {
    return config.get('port');
  }

  get dbHost() {
    return config.get('dbHost');
  }

  get salt() {
    return config.get('salt');
  }
}
