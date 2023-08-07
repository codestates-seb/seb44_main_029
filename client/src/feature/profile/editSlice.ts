import { createSlice } from '@reduxjs/toolkit';

export interface EditState {
  isEdit: boolean;
}

const initialState: EditState = {
  isEdit: false,
};

const editSlice = createSlice({
  name: 'edit',
  initialState,
  reducers: {
    setIsEdit(state, action) {
      state.isEdit = action.payload;
    },
  },
});

export const { setIsEdit } = editSlice.actions;

export default editSlice.reducer;
