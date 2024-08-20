import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./rootReducer"
import persistedReducer from "./auth/AuthReducer";
import { thunk } from "redux-thunk";

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
