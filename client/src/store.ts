import { configureStore } from '@reduxjs/toolkit';
import navReducer from './feature/header/navSlice';
import modalReducer from './feature/header/modalSlice';
import editReducer from './feature/profile/editSlice';

const store = configureStore({
  reducer: {
    nav: navReducer,
    modal: modalReducer,
    edit: editReducer,
  },
});

export default store;
