import { createSlice } from '@reduxjs/toolkit';

export interface EditState {
  isEdit: boolean;
  imgUrl: string | null;
  userName: string | null;
  changeUserName: string | null;
}

const initialState: EditState = {
  isEdit: false,
  imgUrl: null,
  userName: null,
  changeUserName: null,
};

const editSlice = createSlice({
  name: 'edit',
  initialState,
  reducers: {
    setIsEdit(state, action) {
      state.isEdit = action.payload;
    },
    setImgUrl: (state, action) => {
      state.imgUrl = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setChangeUserName: (state, action) => {
      state.changeUserName = action.payload;
    },
  },
});

export const { setIsEdit, setImgUrl, setUserName, setChangeUserName } =
  editSlice.actions;

export default editSlice.reducer;
