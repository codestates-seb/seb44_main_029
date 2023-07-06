import { createSlice } from '@reduxjs/toolkit';
import { fetchThemeItem } from '../api/getThemeItem';

interface Item {
  themeId: number;
  themeTitle: string;
  imageId: number;
  imageTitle: string;
  likeCount: number;
}

interface ItemState {
  loading: boolean;
  items: Item[];
  error: unknown | null;
}

const initialState: ItemState = {
  loading: true,
  items: [],
  error: null,
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThemeItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchThemeItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchThemeItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default itemSlice;
