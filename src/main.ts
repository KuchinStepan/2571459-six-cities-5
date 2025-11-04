import 'reflect-metadata';
import { container } from './autofac.js';
import { TYPES } from './autofac-types.js';
import { Application } from './application.js';

async function bootstrap(): Promise<void> {
  try {
    const app = container.get<Application>(TYPES.Application);
    await app.init();
  } catch (err) {
    console.error('Failed to bootstrap application:', err);
    // process.exit(1);
  }
}

await bootstrap();
