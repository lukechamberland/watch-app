import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain="dev-ackdguglo4xkr11c.us.auth0.com"
    clientId="kWwyacaq61TYe3dV9K7kMRALGUILMGXR"
    authorizationParams={{
      redirect_uri: 'http://localhost:8765'
    }}
  >
    <App />
  </Auth0Provider>,
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
