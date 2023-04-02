import React from "react";
import {
  createUserProfileDocument,
  onAuthStateChangeListener,
} from "../utils/firebase/firebase.utils";

export const UserContext = React.createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = React.useState(null);

  React.useEffect(() => {
    const unSub = onAuthStateChangeListener((user) => {
      if (user) {
        createUserProfileDocument(user);
      }
      setCurrentUser(user);
    });

    return unSub;
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}
