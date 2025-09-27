export interface ICommand {
  readonly name: string;
  readonly description: string;
  invoke(): void;
}
