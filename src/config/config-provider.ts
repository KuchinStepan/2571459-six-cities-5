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

  get dbPort() {
    return config.get('dbPort');
  }

  get dbName() {
    return config.get('dbName');
  }

  get dbPassword() {
    return config.get('dbPassword');
  }

  get dbUser() {
    return config.get('dbUser');
  }

  get salt() {
    return config.get('salt');
  }

  get mongoUri() {
    return `mongodb://${this.dbUser}:${this.dbPassword}@${this.dbHost}:${this.dbPort}/${this.dbName}?authSource=admin`;
  }

  get uploadDirectory() {
    return config.get('uploadDirectory');
  }
}
