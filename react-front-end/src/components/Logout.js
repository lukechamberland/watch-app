import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Logout = () => {
  const { user, logout } = useAuth0();

  return (
    <div>
      <h1>Hello, {user.name}</h1>
      <button onClick={() => logout()}>Logout</button>
      <Product />
    </div>
  );
};

export default Logout;