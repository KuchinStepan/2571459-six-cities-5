import { ICommand } from './ICommand.js';
import path from 'node:path';
import fs from 'node:fs';
import chalk from 'chalk';
import readline from 'node:readline';
import {
  CityValues,
  GoodValues,
  isTypeOf,
  OfferInput,
  OfferTypeValues
} from '../../types/index.js';
import { COLUMN_NAMES } from '../column-names.js';
import { parseBool, parseNumber, validateOffer } from '../cli-helpers.js';

export class ImportCommand implements ICommand {
  readonly name = '--import';
  readonly description = '  --import <file> Import offers from a .tsv file and print the result';

  async invoke(): Promise<void> {
    const argv = process.argv.slice(2);

    if (!argv[1]) {
      console.error(chalk.red('Missing file path.'));
      return;
    }

    const filePath = argv[1];
    await importTsvStream(filePath);
  }
}

type ColumnName = typeof COLUMN_NAMES[number];

async function importTsvStream(filePath: string): Promise<void> {
  const absolute = path.resolve(process.cwd(), filePath);

  if (!fs.existsSync(absolute)) {
    console.error(chalk.red(`File not found: ${absolute}`));
    return;
  }

  const readStream = fs.createReadStream(absolute, { encoding: 'utf8' });
  const rl = readline.createInterface({ input: readStream, crlfDelay: Infinity });

  let lineNumber = 0;
  let success = 0;
  let failed = 0;

  console.log(chalk.blue(`📥 Starting import from ${filePath} ...`));

  for await (const line of rl) {
    lineNumber++;

    if (!line.trim()) {
      continue;
    }

    const cols = line.split('\t');
    if (cols.length < COLUMN_NAMES.length) {
      console.error(chalk.red(`Line ${lineNumber}: wrong number of columns (${cols.length}/${COLUMN_NAMES.length})`));
      failed++;
      continue;
    }

    const data: Record<ColumnName, string> = COLUMN_NAMES.reduce((acc, name, i) => {
      acc[name] = cols[i];
      return acc;
    }, {} as Record<ColumnName, string>);

    try {
      const offer: OfferInput = {
        title: data.title,
        description: data.description,
        postDate: data.post_date,
        city: isTypeOf(data.city, CityValues) ?? 'Paris',
        previewImage: data.preview_image,
        photos: data.photos.split(';').map((s) => s.trim()),
        isPremium: parseBool(data.is_premium),
        isFavorite: parseBool(data.is_favorite),
        rating: parseFloat(data.rating),
        type: isTypeOf(data.type, OfferTypeValues) ?? 'apartment',
        rooms: parseInt(data.rooms, 10),
        guests: parseInt(data.guests, 10),
        price: parseNumber(data.price) ?? 0,
        goods: data.goods.split(';').map((s) => isTypeOf(s.trim(), GoodValues) ?? 'Fridge'),
        authorEmail: data.author_email,
        coordinates: {
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude)
        }
      };

      const errs = validateOffer(offer);
      if (errs.length > 0) {
        console.error(chalk.red(`Line ${lineNumber} validation errors:`), errs.join(', '));
        failed++;
      } else {
        success++;
        console.log(JSON.stringify(offer, null, 2));
      }
    } catch (err) {
      console.error(chalk.red(`Line ${lineNumber}: failed to parse (${(err as Error).message})`));
      failed++;
    }

    if (lineNumber % 10000 === 0) {
      console.log(chalk.gray(`Processed ${lineNumber} lines...`));
    }
  }

  console.log(chalk.blue.bold('\nImport finished!'));
  console.log(chalk.green(`  Successful: ${success}`));
  console.log(chalk.red(`  Failed: ${failed}`));
}
