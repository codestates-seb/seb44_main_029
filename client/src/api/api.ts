import axios from 'axios';
import {
  Musics,
  LoginInfo,
  SignUpInfo,
  IThemeItemProps,
  ItemInfo,
  EditType,
} from '../types/types';

const BASE_URL = 'https://a74a-175-208-216-56.ngrok-free.app/';

/* 유저 정보 가져오기 */
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

export const Logout = async (): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  try {
    const response = await axios.post(`${BASE_URL}members/logout`, null, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
        Authorization: `Bearer ${accessToken}`,
        'Refresh-Token': refreshToken,
      },
    });

    return response;
  } catch (error: any) {
    if (error.response && error.response.status === 500) {
      await RenewAccessToken();

      return Logout();
    }
    throw error;
  }
};

export const FetchEditProfile = async (data: EditType) => {
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

// 이미지 좋아요 상태 업데이트
export const UpdateLike = async (contentId: number): Promise<ItemInfo> => {
  const response = await axios.patch(
    `https://55a4-221-141-172-40.ngrok-free.app/likes/${contentId}/1`,
    {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
      },
    }
  );
  return response.data;
};

// 좋아요한 테마 이미지 리스트 가져오기
export const GetThemeLikes = async (
  themeId: number
): Promise<IThemeItemProps> => {
  const response = await axios.get(
    `https://55a4-221-141-172-40.ngrok-free.app/contents/1/likes/${themeId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
      },
    }
  );
  return response.data;
};

// 토큰 재발급 API
export const RenewAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  try {
    const response = await axios.get(`${BASE_URL}/tokens/name`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const newAccessToken = response.headers['authorization'];
    localStorage.setItem('accessToken', newAccessToken);

    return newAccessToken;
  } catch (error) {
    // 토큰 갱신 실패 시 처리, 예를 들어 로그인 페이지로 리디렉션하거나 오류 메시지 표시
    console.error('액세스 토큰 갱신에 실패했습니다:', error);
    throw error;
  }
};
