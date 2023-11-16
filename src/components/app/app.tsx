import { AppRoute, AuthorizationStatus } from '../../const';
import FavoritesPage from '../../pages/favorites-page/favorites';
import Login from '../../pages/login-page/login';
import MainScreen from '../../pages/main-page/main';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Offer from '../../pages/offer-page/offer';
import NotFoundPage from '../../pages/not-found-pages/not-found-pages';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { useAppSelector } from '../../store/hooks';

const authStatus = AuthorizationStatus.NotAuth;


const defaultCity = {
  location: {
    latitude: 52.23,
    longitude: 4.54,
    zoom: 10
  },
  name: 'Amsterdam'
};

function App (): JSX.Element {
  const offersAll = useAppSelector((state)=> state.offers);
  const checkedCityName = useAppSelector((state) => state.selectedCity);
  const reviews = useAppSelector((state)=> state.reviews);

  const filteredOffers = offersAll.filter((item) => (
    checkedCityName === item.city?.name
  ));

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={
              <MainScreen
                defaultCity={defaultCity}
                offers = {filteredOffers}
              />
            }
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={authStatus}>
                <FavoritesPage propsOffers={offersAll}/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Login}
            element={<Login />}
          />
          <Route
            path={AppRoute.Offer}
            element={<Offer propsOffers={filteredOffers} propsReview={reviews} defaultCity={defaultCity} />}
          />
          <Route
            path='*'
            element={<NotFoundPage />}
          />
        </Routes>

      </BrowserRouter>
    </HelmetProvider>


  );
}

export default App;
