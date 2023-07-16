import axios from 'axios';
import {
  Musics,
  LoginInfo,
  SignUpInfo,
  EditType,
  FetchThemeItemProps,
} from '../types/types';

const BASE_URL =
  'https://1d3c-2001-e60-914a-3a2e-35d9-8182-91fb-3942.ngrok-free.app/';

/* 음악 정보 가져오기 */
export const GetMusic = (ThemeId: string | undefined): Promise<Musics> =>
  axios
    .get(`${BASE_URL}theme/${ThemeId}/music/list`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
      },
    })
    .then((res) => res.data);

export const SignUp = (data: SignUpInfo) =>
  axios.post(`${BASE_URL}members`, data).then((res) => res.data);

export const Login = async (data: LoginInfo) => {
  const response = await axios.post(
    `${BASE_URL}members/login`,
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

  const response = await axios.post(`${BASE_URL}members/logout`, null, {
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': '69420',
      accessToken: `Bearer ${accessToken}`,
      refreshToken: refreshToken,
    },
  });

  return response;
};

/* 음악 정보 가져오기 */
export const PetchEditProfile = async (data: EditType) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const respone = await axios.patch(
    `${BASE_URL}members`,
    {
      imageUrl: data.imageUrl,
      username: data.username,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
        'access-token': `Bearer ${accessToken}`,
        'refresh-token': refreshToken,
      },
    }
  );
  return respone;
};

export const GetThemeItems = async (
  themeId: number,
  pageParam = 1,
  sizeParam = 20
): Promise<FetchThemeItemProps> => {
  const response = await axios.get(
    `https://9985-221-141-172-40.ngrok-free.app/theme/${themeId}?page=${pageParam}&size=${sizeParam}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
      },
    }
  );
  return response.data;
};

/* 업로드 요청 */
export const PostUploadFile = async (data: FormData) => {
  const response = await axios.post(`${BASE_URL}musicUpload`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'ngrok-skip-browser-warning': '69420',
    },
  });
  return response;
};
