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
