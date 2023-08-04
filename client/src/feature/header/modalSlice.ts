import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  isModal: boolean;
}
const initialState: ModalState = {
  isModal: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setIsModal(state, action) {
      state.isModal = action.payload;
    },
  },
});

export const { setIsModal } = modalSlice.actions;

export default modalSlice.reducer;
