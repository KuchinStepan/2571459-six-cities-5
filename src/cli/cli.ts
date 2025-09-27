#!/usr/bin/env ts-node


import chalk from 'chalk';
import {Commands, DefaultCommand} from './commands/index.js';


function main(): void {
  const argv = process.argv.slice(2);

  if (argv.length === 0) {
    return DefaultCommand.invoke();
  }

  const cmd = argv[0];
  for (const command of Commands) {
    if (cmd === command.name) {
      return command.invoke();
    }
  }

  console.error(chalk.red('Unknown command:'), cmd);
  DefaultCommand.invoke();
}

main();
