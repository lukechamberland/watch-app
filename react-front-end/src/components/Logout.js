import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Logout = () => {
  const { user, logout } = useAuth0();

  return (
    <div>
      <h1>Hello, {user.name}</h1>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default Logout;