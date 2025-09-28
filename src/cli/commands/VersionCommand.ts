import { createRequire } from 'node:module';
import {ICommand} from './ICommand.js';

const require = createRequire(import.meta.url);
const pkg = require('../../../package.json');

export class VersionCommand implements ICommand {
  readonly name = '--version';
  readonly description = '  --version       Print application version';

  invoke(): void {
    console.log(pkg.version);
  }
}
