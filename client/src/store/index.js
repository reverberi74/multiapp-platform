import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import cartReducer from "./slice/cartSlice";
import productsReducer from "./slice/productsSlice";
import ordersReducer from "./slice/ordersSlice";
import couponReducer from "./slice/couponSlice";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Combina tutti gli slice
const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
  orders: ordersReducer,
  coupon: couponReducer,
});

// Configura redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // ✅ Solo il carrello va salvato
};

// Crea il reducer persistente
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configura lo store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignora le azioni interne di redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Crea il persistor
export const persistor = persistStore(store);


