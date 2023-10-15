import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

// eslint-disable-next-line react-refresh/only-export-components
const Setting = {
  PlacesCards: 3,
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App placesCards={Setting.PlacesCards}/>
  </React.StrictMode>
);
