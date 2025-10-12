import axios from 'axios';
import fs from 'node:fs';
import { ICommand } from './ICommand.js';
import chalk from 'chalk';
import {OfferSource} from '../../mocks/OfferSource.js';
import {OfferGenerator} from '../../mocks/OfferGenerator.js';
import path from "node:path";

export class GenerateCommand implements ICommand {
  readonly name = '--generate';
  readonly description = '  --generate <n> <filepath> <url>  Generate random offers and save to file';

  async invoke(): Promise<void> {
    const [countStr, filePath, url] = process.argv.slice(3);
    const count = Number.parseInt(countStr, 10);

    if (!count || !filePath || !url) {
      console.error(chalk.red('Wrong arguments. Use: --generate <n> <filepath> <url>'));
      return;
    }

    try {
      console.log(chalk.blue(`Waiting for response from ${url}...`));
      const response = await axios.get<OfferSource[]>(url);
      const offers = response.data;

      const dir = path.dirname(filePath);
      fs.mkdirSync(dir, { recursive: true });

      const generator = new OfferGenerator(offers);
      const writeStream = fs.createWriteStream(filePath, { flags: 'w' });

      for (let i = 0; i < count; i++) {
        const line = generator.generate();
        writeStream.write(`${line}\n`);
      }

      writeStream.end(() => {
        console.log(chalk.green(`Generated ${count} offers and saved in ${filePath}`));
      });
    } catch (error) {
      console.error(chalk.red('Error while generation:'), error);
    }
  }
}
