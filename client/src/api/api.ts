import axios from 'axios';
import {
  Musics,
  LoginInfo,
  SignUpInfo,
  IThemeItemProps,
  ItemInfo,
} from '../types/types';

/* 유저 정보 가져오기 */
export const GetMusic = (ThemeId: string | undefined): Promise<Musics> =>
  axios
    .get(
      `https://aace-175-208-216-56.ngrok-free.app/theme/${ThemeId}/music/list`,
      {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      }
    )
    .then((res) => res.data);

export const SignUp = (data: SignUpInfo) =>
  axios
    .post('https://aace-175-208-216-56.ngrok-free.app/members', data)
    .then((res) => res.data);

export const Login = async (data: LoginInfo) => {
  const response = await axios.post(
    'https://aace-175-208-216-56.ngrok-free.app/members/login',
    {
      email: data.email,
      password: data.password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
      },
    }
  );

  return response;
};

export const Logout = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  const response = await axios.post(
    'https://aace-175-208-216-56.ngrok-free.app/members/logout',
    null,
    {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
        accessToken: `Bearer ${accessToken}`,
        refreshToken: refreshToken,
      },
    }
  );

  return response;
};

// 테마 이미지 리스트 가져오기
export const GetThemeItems = async (
  themeId: number,
  pageParam = 1,
  sizeParam = 20
): Promise<IThemeItemProps> => {
  const response = await axios.get(
    `https://55a4-221-141-172-40.ngrok-free.app/theme/${themeId}/1?page=${pageParam}&size=${sizeParam}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
      },
    }
  );
  return response.data;
};

// 이미지 좋아요 업데이트
export const UpdateLike = async (contentId: number): Promise<ItemInfo> => {
  // const accessToken = localStorage.getItem('accessToken');
  // const refreshToken = localStorage.getItem('refreshToken');

  const response = await axios.patch(
    `https://55a4-221-141-172-40.ngrok-free.app/likes/${contentId}/1`,
    {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
        // accessToken: `Bearer ${accessToken}`,
        // refreshToken: refreshToken,
      },
    }
  );
  return response.data;
};

// 좋아요한 테마 이미지 리스트 가져오기
export const GetThemeLikes = async (
  themeId: number
): Promise<IThemeItemProps> => {
  // const accessToken = localStorage.getItem('accessToken');
  // const refreshToken = localStorage.getItem('refreshToken');

  const response = await axios.get(
    `https://55a4-221-141-172-40.ngrok-free.app/contents/1/likes/${themeId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
        // accessToken: `Bearer ${accessToken}`,
        // refreshToken: refreshToken,
      },
    }
  );
  return response.data;
};
