import {ICommand} from './ICommand.js';
import path from 'node:path';
import fs from 'node:fs';
import chalk from 'chalk';
import {CityValues, GoodValues, isTypeOf, OfferInput, OfferTypeValues} from '../../types/index.js';
import {COLUMN_NAMES} from '../column-names.js';
import {parseBool, parseNumber, validateOffer} from '../cli-helpers.js';

export class ImportCommand implements ICommand {
  readonly name = '--import';
  readonly description = '  --import <file> Import offers from a .tsv file and print the result';

  invoke(): void {
    const argv = process.argv.slice(2);

    if (!argv[1]) {
      console.error(chalk.red('Missing file path.'));
      process.exit(1);
    }
    importTsv(argv[1]);
  }
}

type ColumnName = typeof COLUMN_NAMES[number];

function importTsv(filePath: string): void {
  const absolute = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(absolute)) {
    console.error(chalk.red('File not found:'), absolute);
    process.exit(2);
  }
  const content = fs.readFileSync(absolute, 'utf8');
  const lines = content.split(/\r?\n/).filter(Boolean);
  const offers: OfferInput[] = [];
  let success = 0, failed = 0;

  lines.forEach((line, idx) => {
    const cols = line.split('\t');
    if (cols.length < COLUMN_NAMES.length) {
      console.error(chalk.red(`Line ${idx + 1}: wrong number of columns`));
      failed++;
      return;
    }

    const data: Record<ColumnName, string> = COLUMN_NAMES.reduce((acc, name, i) => {
      acc[name] = cols[i];
      return acc;
    }, {} as Record<ColumnName, string>);

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
      coordinates: { latitude: parseFloat(data.latitude), longitude: parseFloat(data.longitude) }
    };

    const errs = validateOffer(offer);
    if (errs.length > 0) {
      console.error(chalk.red(`Line ${idx + 1} errors:`), errs.join(', '));
      failed++;
    } else {
      offers.push(offer);
      success++;
    }
  });

  console.log(chalk.blue.bold('\nImport result:'));
  console.log(chalk.green(`  Successful: ${success}`));
  console.log(chalk.red(`  Failed: ${failed}`));
  console.log(chalk.blue('\nParsed offers:'));
  console.log(JSON.stringify(offers, null, 2));
}
