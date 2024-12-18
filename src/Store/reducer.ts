import {createReducer} from '@reduxjs/toolkit';
import {cities} from '../mocks/cities.ts';
import {
  setAuthorizationStatus,
  setSelectedCity,
  setFavorites, setHoveredOffer,
  setLogin,
  setNearbyOffers,
  setOffers,
  setOffersLoading, setPlacesSortOptions, setDetailedOffer, setComments
} from './actions.ts';
import {AppState} from '../types/AppState.ts';
import {AuthorizationStatus} from '../constants/AuthorizationStatus.ts';
import {PlacesSortOptions} from '../constants/PlacesSortOptions.ts';


const initialState: AppState = {
  selectedCity: cities[5],
  offers: [],
  hoveredOffer: null,
  nearbyOffers: [],
  favorites: [],
  placesSortOptions: PlacesSortOptions.Default,
  loading: true,
  authorizationStatus: AuthorizationStatus.NoAuth,
  login: '',
  currentDetailedOffer: null,
  offerComments: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setSelectedCity, (state, action) => {
      state.selectedCity = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setHoveredOffer, (state, action) => {
      state.hoveredOffer = action.payload;
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(setOffersLoading, (state, action) => {
      state.loading = action.payload;
    })
    .addCase(setDetailedOffer, (state, action) => {
      state.currentDetailedOffer = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setComments, (state, action) => {
      state.offerComments = action.payload;
    })
    .addCase(setPlacesSortOptions, (state, action) => {
      state.placesSortOptions = action.payload;
    })
    .addCase(setLogin, (state, action) => {
      state.login = action.payload;
    });
});
