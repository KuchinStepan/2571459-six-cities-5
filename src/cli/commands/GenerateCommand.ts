import axios from 'axios';
import fs from 'node:fs';
import { ICommand } from './ICommand.js';
import chalk from 'chalk';
import {OfferGenerator} from '../../mocks/OfferGenerator.js';
import path from 'node:path';
import {OfferInput} from '../../types/index.js';
import {MockData} from '../../mocks/test-data-types.js';

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
      const response = await axios.get<MockData>(url);
      const data = response.data;

      if (!data.cities || !data.users || !data.goods) {
        console.error(chalk.red('Wrong data from JSON-server'));
        return;
      }

      const dir = path.dirname(filePath);
      fs.mkdirSync(dir, { recursive: true });

      const generator = new OfferGenerator(data);
      const writeStream = fs.createWriteStream(filePath, { flags: 'w' });

      for (let i = 0; i < count; i++) {
        const offer = generator.generate();
        const line = this.convertOfferToTsv(offer);
        writeStream.write(`${line}\n`);
      }

      writeStream.end(() => {
        console.log(chalk.green(`Generated ${count} offers and saved in ${filePath}`));
      });
    } catch (error) {
      console.error(chalk.red('Error while generation:'), error);
    }
  }

  private convertOfferToTsv(offer: OfferInput & {
    author: { name: string; avatar: string; password: string; type: string }
  }): string {
    return [
      offer.title,
      offer.description,
      offer.postDate,
      offer.city,
      offer.previewImage,
      offer.photos.join(';'),
      offer.isPremium,
      offer.isFavorite,
      offer.rating,
      offer.type,
      offer.rooms,
      offer.guests,
      offer.price,
      offer.goods.join(';'),
      offer.authorEmail,
      offer.author.name,
      offer.author.avatar,
      offer.author.password,
      offer.author.type,
      offer.coordinates.latitude,
      offer.coordinates.longitude
    ].join('\t');
  }
}


