import { configureStore } from "@reduxjs/toolkit";

import realtorSlice from "../features/realtorSlice";

// import { getLocalStorage } from "../js/helpers";

const reducer = {
  realtorSlice,
};

const preloadedState = {
  // ...getLocalStorage("state") ? getLocalStorage("state") : {},
};

export const store = configureStore({
  reducer,
  preloadedState,
  devTools: process.env.NODE_ENV !== "production",
});
