import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./rootReducer";

const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const configureStore = () => {
  const persistConfig = {
    key: "root",
    storage
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  let store = createStore(persistedReducer, reduxDevTools);
  let persistor = persistStore(store);

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept("./rootReducer", () => {
        store.replaceReducer(rootReducer);
      });
    }
  }

  return { store, persistor };
};

export default configureStore;
