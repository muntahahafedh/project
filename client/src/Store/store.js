import React, { createContext, useContext, useReducer } from "react";
import { userReducer, initialUserState } from "../Features/UserSlice";
import eventReducer, { initialEventState } from "../Features/eventSlice";
import jobsReducer, { initialJobState } from "../Features/jobsSlice";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [eventState, eventDispatch] = useReducer(eventReducer, initialEventState);
  const [jobsState, jobsDispatch] = useReducer(jobsReducer, initialJobState);

  return (
    <AppContext.Provider value={{
      user: userState.user,
      isLoggedIn: userState.isLoggedIn,
      userDispatch,
      events: eventState.events,
      eventDispatch,
      jobs: jobsState.jobs,
      jobsDispatch
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
