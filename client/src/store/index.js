import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import cartReducer from "./slice/cartSlice";
import productsReducer from "./slice/productsSlice";
import ordersReducer from "./slice/ordersSlice";
import couponReducer from "./slice/couponSlice";
import settingsSlice from "./slice/settingsSlice ";
import authReducer from "./slice/authSlice"; // ✅ Importa lo slice dell'autenticazione

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
  auth: authReducer,     // ✅ Aggiunto auth
  cart: cartReducer,
  products: productsReducer,
  orders: ordersReducer,
  coupon: couponReducer,
  settings: settingsSlice,
});

// Configura redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"], 
  // ✅ Ora salviamo auth (token + user) e cart
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
