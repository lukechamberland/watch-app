import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Login() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <h1>Welcome! Please log in.</h1>
      <button onClick={() => loginWithRedirect()}>Login</button>
    </div>
  );
}

export default Login;
