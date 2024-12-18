import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {store} from './Store';
import {AppRoute} from '@constants';
import {findOffers, getFavorites} from './api/ApiClient.ts';
import {useAppStoreSelector} from './hooks/useAppStoreStore.ts';
import {Spinner} from './Components/Spinner.tsx';
import {FavoritesPage, LoginPage, MainPage, NotFoundPage, OfferPage} from '@pages';
import {Layout, PrivateRoute} from '@layouts';


store.dispatch(findOffers());
store.dispatch(getFavorites());

export function App() {
  const isLoading = useAppStoreSelector((state) => state.loading);
  if (isLoading){
    return(<Spinner />);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Layout/>}>
          <Route index element={<MainPage/>}/>
        </Route>
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesPage/>
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Offer} element={<OfferPage/>}/>
        <Route path={AppRoute.Login} element={<LoginPage/>}/>
        <Route path={AppRoute.NotFound} element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}
