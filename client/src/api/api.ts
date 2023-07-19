import axios from 'axios';
import {
  Musics,
  LoginInfo,
  SignUpInfo,
  IThemeItemProps,
  ItemInfo,
  EditType,
} from '../types/types';

const BASE_URL =
  'http://ec2-54-180-127-81.ap-northeast-2.compute.amazonaws.com:8080/';

// 음악 리스트 요청
export const GetMusic = (ThemeId: string | undefined): Promise<Musics> =>
  axios
    .get(`${BASE_URL}theme/${ThemeId}/music/list`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
      },
    })
    .then((res) => res.data);

// 회원가입
export const SignUp = (data: SignUpInfo) =>
  axios.post(`${BASE_URL}members`, data).then((res) => {
    return res;
  });

// 로그인
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

// 로그아웃
export const Logout = async (): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await axios.post(`${BASE_URL}members/logout`, null, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
        Authorization: `Bearer ${accessToken}`,
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

// 프로필 수정
export const PetchEditProfile = async (data: EditType) => {
  const accessToken = localStorage.getItem('accessToken');

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
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return respone;
};

// 테마 이미지 리스트 가져오기
export const GetThemeItems = async (
  themeId: number,
  pageParam: number,
  sizeParam: number
): Promise<IThemeItemProps> => {
  const accessToken = localStorage.getItem('accessToken');

  const response = await axios.get(
    `${BASE_URL}theme/${themeId}?page=${pageParam}&size=${sizeParam}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

// 업로드 요청
export const PostUploadFile = async (data: FormData) => {
  const response = await axios.post(`${BASE_URL}musicUpload`, data, {
    headers: {
      'Content-Type': 'multipart/form-data', // multipart/form-data
      'ngrok-skip-browser-warning': '69420',
    },
  });
  return response;
};

// 이미지 좋아요 상태 업데이트
export const UpdateLike = async (contentId: number): Promise<ItemInfo> => {
  const accessToken = localStorage.getItem('accessToken');

  const response = await axios.patch(`${BASE_URL}likes/${contentId}`, null, {
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': '69420',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// 좋아요한 테마 이미지 리스트 가져오기
export const GetThemeLikes = async (
  themeId: number
): Promise<IThemeItemProps> => {
  const accessToken = localStorage.getItem('accessToken');

  const response = await axios.get(`${BASE_URL}contents/likes/${themeId}`, {
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': '69420',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// 토큰 재발급 API
export const RenewAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  try {
    const response = await axios.get(
      `${BASE_URL}/tokens/name`,

      {
        data: {
          'refresh-token': refreshToken,
        },
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      }
    );

    const newAccessToken = response.headers['authorization'];
    localStorage.setItem('accessToken', newAccessToken);

    return newAccessToken;
  } catch (error) {
    // 토큰 갱신 실패 시 처리, 예를 들어 로그인 페이지로 리디렉션하거나 오류 메시지 표시
    console.error('액세스 토큰 갱신에 실패했습니다:', error);
    throw error;
  }
};

// 상세 이미지 정보 가져오기
export const GetDetailedItem = async (contentId: number) => {
  const accessToken = localStorage.getItem('accessToken');

  const response = await axios.get(`${BASE_URL}contents/${contentId}`, {
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': '69420',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
