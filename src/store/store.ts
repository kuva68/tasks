import { configureStore } from '@reduxjs/toolkit';
import { tasksApi } from './tasks/tasksApi';
import tasksReducer from './tasks/tasksSlice';
import settingsReducer from './settings/settingsSlice';
const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
    tasks: tasksReducer,
    settings: settingsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      tasksApi.middleware,
    ),
});
export default store;
