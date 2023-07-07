import axios from 'axios';

const baseUrl = 'https://a1ab-175-208-216-56.ngrok-free.app/';

async function fetchMusicList(number: number): Promise<any> {
  const url = `${baseUrl}/theme/${number}/music/list`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('API 요청 중 오류가 발생했습니다:', error);
    throw error;
  }
}

export default fetchMusicList;
