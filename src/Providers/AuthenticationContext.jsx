import React, { createContext, useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { app } from "../Helpers/API";

const AuthenticationContext = createContext();

function AuthenticationProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);
  const auth = getAuth(app);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setAuthenticated(true);
      console.log(result.user);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const signOut = async () => {
    await auth.signOut();
    setUser(null);
    setAuthenticated(false);
    setLoading(false)
  };

  return (
    <AuthenticationContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        user,
        setUser,
        signInWithGoogle,
        signOut,
        isLoading: loading,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export { AuthenticationProvider };
export default AuthenticationContext;
