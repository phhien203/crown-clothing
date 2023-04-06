import React from "react";
import {
  createUserProfileDocument,
  onAuthStateChangeListener,
} from "../utils/firebase/firebase.utils";

export const UserContext = React.createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPE = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const INITIAL_STATE = {
  currentUser: null,
};

function userReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPE.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled action type ${type} in userReducer`);
  }
}

export function UserProvider({ children }) {
  const [{ currentUser }, dispatch] = React.useReducer(
    userReducer,
    INITIAL_STATE
  );

  function setCurrentUser(user) {
    dispatch({ type: USER_ACTION_TYPE.SET_CURRENT_USER, payload: user });
  }

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
