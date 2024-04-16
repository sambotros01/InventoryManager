import React, { createContext, useState } from "react";

export const LogInTracker = createContext();


export const LoggedInProvider = ({ children }) => {
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ userId, setUserId ] = useState(0)
  const [ refreshToggle, setRefreshToggle ] = useState(false)
  return (
    <LogInTracker.Provider
      value={{
        loggedIn,
        setLoggedIn,
        userId,
        setUserId,
        refreshToggle,
        setRefreshToggle
      }}
    >
      {children}
    </LogInTracker.Provider>
  );
};
