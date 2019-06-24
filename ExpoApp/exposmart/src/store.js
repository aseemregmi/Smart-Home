import { AsyncStorage } from "react-native";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";

import rootReducer from "./Reducers";

const persistConfig = {
  key: "smart-home",
  storage: AsyncStorage
};

const middlewares = [thunk];

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  undefined,
  compose(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);
