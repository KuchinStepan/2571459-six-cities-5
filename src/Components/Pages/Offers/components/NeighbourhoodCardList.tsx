import {NeighbourhoodCard} from '@components';
import {Offer} from '@types';

type NeighbourhoodListProps = {
  mocks: Array<Offer>;
}

export function NeighbourhoodCardList({mocks}: NeighbourhoodListProps) {
  return (
    <div className="near-places__list places__list tabs__content">
      {mocks.map((offerMock) => (
        <div
          key={offerMock.id}
        >
          <NeighbourhoodCard {...offerMock} />
        </div>
      ))}
    </div>);
}
