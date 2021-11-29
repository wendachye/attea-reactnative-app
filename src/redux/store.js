import {configureStore} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';
import rootSaga from './rootSaga';
import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: [
    'user',
    'settings',
    'vouchers',
    'points',
    'stamps',
    'orders',
    'referrals',
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

let middleware = [sagaMiddleware];

if (__DEV__) {
  const logger = createLogger({
    collapsed: true,
  });

  middleware = [...middleware, logger];
}

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false,
    }),
    ...middleware,
  ],
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export {store, persistor};
