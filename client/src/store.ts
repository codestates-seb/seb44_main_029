import { configureStore } from '@reduxjs/toolkit';
import navReducer from './feature/header/navSlice';
import modalReducer from './feature/header/modalSlice';

const store = configureStore({
  reducer: {
    nav: navReducer,
    modal: modalReducer,
  },
});

export default store;
