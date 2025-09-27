import {ICommand} from './ICommand.js';

export class VersionCommand implements ICommand {
  readonly name = '--version';
  readonly description = '  --version       Print application version';

  invoke(): void {
    console.log(1);
  }
}
