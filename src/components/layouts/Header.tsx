import {useAppStoreSelector} from '@hooks';
import {AppRoute, AuthorizationStatus} from '@constants';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setAuthorizationStatus} from '@store-actions';
import {dropToken} from '@api';

function AuthorizedHeaderNav() {
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dropToken();
  };
  const login = useAppStoreSelector((state) => state.app.login);
  const favoritesLength = useAppStoreSelector((state) => state.offers.favorites.length);
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{login}</span>
            <span className="header__favorite-count">{favoritesLength}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <div className="header__nav-link" onClick={handleSignOut}>
            <span className="header__signout">Sign out</span>
          </div>
        </li>
      </ul>
    </nav>
  );
}

function NoAuthNavHeader() {
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Main}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <Link className="header__login" to={AppRoute.Login}>Sign in</Link>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export function Header() {
  const status = useAppStoreSelector((state) => state.app.authorizationStatus);
  return (
    <header>
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          {status === AuthorizationStatus.Auth ? <AuthorizedHeaderNav/> : <NoAuthNavHeader/>}
        </div>
      </div>
    </header>);
}
