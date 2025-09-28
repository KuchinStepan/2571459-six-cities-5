import type {ICommand} from './ICommand.js';
import {HelpCommand} from './HelpCommand.js';
import {VersionCommand} from './VersionCommand.js';
import {ImportCommand} from './ImportCommand.js';

export type {ICommand} from './ICommand.js';

export const DefaultCommand: ICommand = new HelpCommand();

export const Commands: readonly ICommand[] = [
  DefaultCommand,
  new VersionCommand(),
  new ImportCommand(),
] as const;

