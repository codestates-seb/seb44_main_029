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
