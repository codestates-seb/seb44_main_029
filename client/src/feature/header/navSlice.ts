import { createSlice } from '@reduxjs/toolkit';

export interface NavState {
  isClicked: boolean;
}

const initialState: NavState = {
  isClicked: false,
};

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setIsClicked(state, action) {
      state.isClicked = action.payload;
    },
  },
});

export const { setIsClicked } = navSlice.actions;

export default navSlice.reducer;
