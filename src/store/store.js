import { configureStore } from "@reduxjs/toolkit";

// import { getLocalStorage } from "../js/helpers";

const reducer = {
};

const preloadedState = {
  // ...getLocalStorage("state") ? getLocalStorage("state") : {},
};

export const store = configureStore({
  reducer,
  preloadedState,
  devTools: process.env.NODE_ENV !== "production",
});
