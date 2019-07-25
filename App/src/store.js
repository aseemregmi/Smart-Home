// import { AsyncStorage } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./Reducers";

const persistConfig = {
  timeout: 0,
  key: "smart-home",
  storage: AsyncStorage,
  blacklist: []
};

const middlewares = [thunk];

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  undefined,
  composeWithDevTools(applyMiddleware(...middlewares))
);

// persistStore(store).purge();

export const persistor = persistStore(store);
