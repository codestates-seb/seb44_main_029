import { createSlice } from '@reduxjs/toolkit';

export interface EditState {
  isEdit: boolean;
  imgUrl: string | null;
  userName: string | null;
  noChangeUserName: string | null;
}

const initialState: EditState = {
  isEdit: false,
  imgUrl: null,
  userName: null,
  noChangeUserName: null,
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
    setNoChangeUserName: (state, action) => {
      state.noChangeUserName = action.payload;
    },
  },
});

export const { setIsEdit, setImgUrl, setUserName, setNoChangeUserName } =
  editSlice.actions;

export default editSlice.reducer;
