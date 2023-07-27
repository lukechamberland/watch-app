import React from 'react';
import { useAuth0 } from './useAuth0';

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
