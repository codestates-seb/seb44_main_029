import axios from 'axios';
import {
  Musics,
  LoginInfo,
  SignUpInfo,
  ItemType,
  PageInfo,
} from '../types/types';

/* 유저 정보 가져오기 */
export const GetMusic = (ThemeId: string | undefined): Promise<Musics> =>
  axios
    .get('https://aace-175-208-216-56.ngrok-free.app/theme/1/music/list', {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
      },
    })

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