import convict from 'convict';
import validator from 'convict-format-with-validator';
import dotenv from 'dotenv';

convict.addFormat(validator.ipaddress);

dotenv.config();

export type AppConfig = {
  port: number;
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbPassword: string;
  dbUser: string;
  salt: string;
  uploadDirectory: string;
};

export const config = convict<AppConfig>({
  port: {
    doc: 'Порт, на котором работает приложение',
    format: 'port',
    default: 3500,
    env: 'PORT'
  },
  dbHost: {
    doc: 'Адрес базы данных (IP)',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'DB_HOST'
  },
  dbPort: {
    doc: 'Порт MongoDB',
    format: 'port',
    default: 27017,
    env: 'DB_PORT',
  },
  dbName: {
    doc: 'Имя базы данных',
    format: String,
    default: 'six-cities',
    env: 'DB_NAME',
  },
  dbUser: {
    doc: 'Имя пользователя MongoDB',
    format: String,
    default: '',
    env: 'DB_USER',
  },
  dbPassword: {
    doc: 'Пароль пользователя MongoDB',
    format: String,
    default: '',
    env: 'DB_PASSWORD',
  },
  salt: {
    doc: 'Соль (строка со случайным набором символом)',
    format: String,
    default: null as unknown as string,
    env: 'SALT'
  },
  uploadDirectory: {
    doc: 'Path to directory where uploaded files will be stored',
    format: String,
    default: './upload',
    env: 'UPLOAD_DIR'
  }
});

config.validate({ allowed: 'strict' });
