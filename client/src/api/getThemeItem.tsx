import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AppDispatch, RootState } from '../store/store';

interface FetchThemeItemData {
  themeId: number;
  themeTitle: string;
  itemList: {
    itemId: number;
    itemImage: string;
    imageTitle: string;
    likeCount: number;
  };
}

export interface AxiosResponseError {
  error: unknown;
}

export const fetchThemeItem = createAsyncThunk<
  FetchThemeItemData[], // API 요청 성공 시, action의 리턴 타입
  number, // 첫 번째 매개변수 인자의 타입(themeId)
  {
    // thunkApi 필드 타입 정의(Thunk 함수에서 사용할 추가 매개변수 타입 정의)
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: AxiosResponseError; // 에러 타입
  }
>(`item/fetchThemeItem`, async (themeId, thunkAPI) => {
  try {
    const response = await axios.get(`/theme/${themeId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});

export default {};
