import { injectable } from 'inversify';
import {BaseRepository} from '../../BaseRepository.js';
import {IOfferRepository} from './IOfferRepository.js';
import {OfferEntity, OfferModel} from './offer.js';

@injectable()
export class OfferRepository extends BaseRepository<OfferEntity> implements IOfferRepository {
  constructor() {
    super(OfferModel);
  }

  public async findByCity(city: string): Promise<OfferEntity[]> {
    const offers = await this.model.find({ city }).exec();
    return offers.map((o) => o.toObject());
  }
}
