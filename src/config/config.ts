import convict from 'convict';
import validator from 'convict-format-with-validator';
import dotenv from 'dotenv';

convict.addFormat(validator.ipaddress);

dotenv.config();

export type AppConfig = {
  port: number;
  dbHost: string;
  apiKey: string;
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
  apiKey: {
    doc: 'Api ключ',
    format: String,
    default: null as unknown as string,
    env: 'API_KEY'
  }
});

config.validate({ allowed: 'strict' });
