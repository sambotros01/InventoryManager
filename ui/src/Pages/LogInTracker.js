import React, { createContext, useState } from "react";

export const LogInTracker = createContext();

// Set global variables
export const LoggedInProvider = ({ children }) => {
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ userId, setUserId ] = useState(0)
  const [ refreshToggle, setRefreshToggle ] = useState(false)
  const [ deleted, setDeleted ] = useState(false);
  const [item, setItem ] = useState(0);
  return (
    <LogInTracker.Provider
      value={{
        loggedIn,
        setLoggedIn,
        userId,
        setUserId,
        refreshToggle,
        setRefreshToggle,
        deleted,
        setDeleted,
        item,
        setItem
      }}
    >
      {children}
    </LogInTracker.Provider>
  );
};
