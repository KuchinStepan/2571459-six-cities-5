import {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {findNearbyOffers, getComments, getOffer} from '@api-client';
import {CommentSendingForm, Map, NeighbourhoodCardList, OfferGallery, OfferGoods, ReviewList} from '@components';
import {AppRoute, AuthorizationStatus} from '@constants';
import {useAppStoreSelector} from '@hooks';
import {Header} from '@layouts';
import {NotFoundPage} from '@pages';
import {store} from '@store';
import {handleUpdateBookmark} from '../../components/helpers';

export function OfferPage() {
  const {id} = useParams();
  const offerId = id || '-';
  useEffect(() => {
    store.dispatch(getOffer(offerId));
    store.dispatch(findNearbyOffers(offerId));
    store.dispatch(getComments(offerId));
  }, [offerId]);

  const navigate = useNavigate();
  const offer = useAppStoreSelector((state) => state.offers.currentDetailedOffer);
  const nearbyOffers = useAppStoreSelector((state) => state.offers.nearbyOffers);
  const comments = useAppStoreSelector((state) => state.offers.offerComments);
  const isAuth = useAppStoreSelector((state) => state.app.authorizationStatus) === AuthorizationStatus.Auth;
  if (offer === null) {
    return <NotFoundPage/>;
  }
  const starsWidth = `${offer.rating * 20}%`;
  const bookmarkClass = `offer__bookmark-button ${offer.isFavorite && 'offer__bookmark-button--active'} button`;


  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery imageUrls={offer.images}/>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                <button className={bookmarkClass} type="button" onClick={ async () => {
                  await handleUpdateBookmark(offer.id,
                    offer.isFavorite,
                    isAuth,
                    () => navigate(AppRoute.Login));
                }}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: starsWidth}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <OfferGoods goods={offer.goods}/>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="offer__user-name">
                    {offer.host.name}
                  </span>
                  {
                    offer.host.isPro &&
                    <span className="offer__user-status">
                    Pro
                    </span>
                  }
                </div>
                <div className="offer__description">
                  {offer.description}
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
                <ReviewList comments={comments
                  .toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, 10)}
                />
                {
                  isAuth &&
                  <CommentSendingForm offerId={offer.id}/>
                }
              </section>
            </div>
          </div>
          <section className="map"
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: '700px'
            }}
          >
            <Map
              offers={nearbyOffers.slice(0, 3).concat(offer)}
              height={'600px'}
              width={'1100px'}
              hoveredOffer={offer}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <NeighbourhoodCardList offers={nearbyOffers.slice(0, 3)}/>
          </section>
        </div>
      </main>
    </div>
  );
}
