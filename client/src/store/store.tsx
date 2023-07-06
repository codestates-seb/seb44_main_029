import { configureStore } from '@reduxjs/toolkit';
import itemSlice from './itemSlice';

const store = configureStore({
  reducer: {
    item: itemSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
