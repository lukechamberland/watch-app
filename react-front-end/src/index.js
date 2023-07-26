import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

ReactDOM.render(
  <Auth0Provider
    domain="dev-zrpi1kyvdtcnt5hn.us.auth0.com"
    clientId="Kb8UGgA4lnv2IORxDhbGI6woq3uYiy12"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);
