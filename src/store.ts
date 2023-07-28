import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';

import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import memoReducers from './features/memoSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({
  memo: memoReducers,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
