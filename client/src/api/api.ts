import axios from 'axios';
import {
  Musics,
  LoginInfo,
  SignUpInfo,
  ItemType,
  PageInfo,
} from '../types/types';

/* 유저 정보 가져오기 */
export const GetMusic = (): Promise<Musics> =>
  axios
    .get('https://f490-175-208-216-56.ngrok-free.app/theme/1/music/list', {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
      },
    })
    .then((res) => res.data);

export const SignUp = (data: SignUpInfo) =>
  axios
    .post('https://f490-175-208-216-56.ngrok-free.app/members', data)
    .then((res) => res.data);

export const Login = (data: LoginInfo) =>
  axios
    .post('https://f490-175-208-216-56.ngrok-free.app/members/login', data)
    .then((res) => {
      const accessToken = res.headers['accessToken'];
      const refreshToken = res.headers.refreshToken;
      console.log('토큰: ', res);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    });
