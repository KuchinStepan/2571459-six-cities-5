import chalk from 'chalk';
import {ICommand} from './ICommand.js';
import {Commands} from './index.js';

export class HelpCommand implements ICommand {
  readonly name = '--help';
  readonly description = '  --help          Show this help';

  invoke(): void {
    console.log(chalk.green.bold('Six Cities — CLI'));
    console.log(chalk.yellow('Usage:'));
    console.log('  six-cities [command] [options]');
    console.log();
    console.log(chalk.yellow('Commands:'));
    for (const command of Commands) {
      console.log(command.description);
    }
  }
}
