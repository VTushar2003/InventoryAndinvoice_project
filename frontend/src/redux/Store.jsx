import { configureStore } from "@reduxjs/toolkit";
import productReducer  from "./rootReducer"
import filterReducer from "./FilterSlice";
import persistedReducer from "./auth/AuthReducer";
import { thunk } from "redux-thunk";

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    product: productReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
