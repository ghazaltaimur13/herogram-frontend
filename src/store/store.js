import {
    combineReducers,
    configureStore,
  } from '@reduxjs/toolkit';
  import storage from 'redux-persist/lib/storage';
  import baseReducer from './features/baseSlice';
  import { apiSlice } from './api/apiSlice';
  import {
    persistStore,
    persistReducer,
  } from 'redux-persist';
  // Persistence configurations
  const rootPersistConfig = {
    key: 'root',
    version: 1,
    storage,
  };
  
  const basePersistConfig = {
    key: 'base',
    version: 1,
    storage,
  };
  
  // Root reducer
  const rootReducer = combineReducers({
    base: persistReducer(basePersistConfig, baseReducer),
    [apiSlice.reducerPath]: apiSlice.reducer,
  });
  
  // Persisted reducer
  const persistedRootReducer = persistReducer(rootPersistConfig, rootReducer);
  
  // Store configuration

  export const setupStore = () =>
      configureStore({
        reducer: persistedRootReducer,
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware().concat(apiSlice.middleware),
  });
    
  
  export const store = setupStore();
  export const persistor = persistStore(store);
