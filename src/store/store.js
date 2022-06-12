import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import currencyReducer from "./currencySlice";
import cartReducer from "./cartSlice";
import showCartReducer from "./showCartSlice";

const rootReducer = combineReducers({
  currency: currencyReducer,
  cart: cartReducer,
  showCart: showCartReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["showCart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
