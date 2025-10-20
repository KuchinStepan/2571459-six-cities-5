import convict from 'convict';
import validator from 'convict-format-with-validator';
import dotenv from 'dotenv';

convict.addFormat(validator.ipaddress);

dotenv.config();

export type AppConfig = {
  port: number;
  dbHost: string;
  salt: string;
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
  salt: {
    doc: 'Соль (строка со случайным набором символом)',
    format: String,
    default: null as unknown as string,
    env: 'SALT'
  }
});

config.validate({ allowed: 'strict' });
