import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import AuthenticationContext from "../../Providers/AuthenticationContext";

const GoogleHeader = () => {
  const { signInWithGoogle } = useContext(AuthenticationContext);
  const { signOut } = useContext(AuthenticationContext);
  const { authenticated } = useContext(AuthenticationContext);
  const { user } = useContext(AuthenticationContext);
  const { isLoading } = useContext(AuthenticationContext);

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign In</button>
      <button onClick={signOut}>Sign Out</button>
      { /*
      {authenticated && <h3>Authenticated</h3>}
      {authenticated && <p>{JSON.stringify(user, null, 2)}</p>}
      {isLoading && <h1>Loading...</h1>}
      */}
    </div>
  );
};

export default GoogleHeader;
