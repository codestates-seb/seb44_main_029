import { Howl } from 'howler';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import iconPlay from '../../assets/icon/iconPlay.png';
import iconPrev from '../../assets/icon/iconPrev.png';
import iconNext from '../../assets/icon/iconNext.png';
import iconPause from '../../assets/icon/iconPause.png';
import styled from 'styled-components';
import iconMusic from '../../assets/icon/icon_music.png';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { GetMusic } from '../../api/api';

//오디오 플레이어
const AudioPlayer = () => {
  const [sound, setSound] = useState<Howl | null>(null);
  const volumes = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
  const [currentVolume, setCurrentVolume] = useState<number>(0.5);
  const [ThemeMusics, setThemeMusics] = useState([]);
  const [nowMusicId, setNowMusicId] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const { themeId } = useParams();
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;

  const queryClient = useQueryClient();
  const music = useQuery(['music'], GetMusic);
  console.log(music);

  const PatchMutation = useMutation(GetMusic, {
    onSuccess: () => queryClient.invalidateQueries(['music']),
  });

  // path가 변경될 떄마다.
  useEffect(() => {
    // path가 theme이후에 themeId가 1~5 라면?
    if (/\/theme\/[1-5]$/.test(currentPath)) {
      // const fetchData = async (): Promise<void> => {
      //   try {
      //     const response = await API.GET('theme/1/music/list', {
      // headers: {
      //   'Content-Type': 'application/json',
      //   'ngrok-skip-browser-warning': '69420',
      // },
      //     });
      //     // 응답 데이터 처리
      //     console.log(response?.data);
      //   } catch (error) {
      //     console.error('API 호출 에러:', error);
      //   }
      // };
      // fetchData();
      // GetMusic()
      //   // 응답 성공시 노래설정 & 현재 노래ID 0번대로 초기화
      //   .then((data) => {
      //     console.log(data);
      //   })
      //   .catch((error) => console.log(error));
      // path에 /theme가 포함 안되어 있으면 MusicId -1로 셋팅 (받아들일 자세)
    } else if (!currentPath.includes('/theme/')) {
      setNowMusicId(-1);
      // path에 /theme가 포함 안되어 있는데 노래가 나오는 경우
      if (isPlaying) handleTogglePlay();
    }
    console.log(currentPath);
  }, [currentPath]);

  //현재 노래ID 변경시 새로운 인스턴스 생성 & 중복생성을 방지 하기위한 useEffect 로직
  useEffect(() => {
    const soundInstance = new Howl({
      src: [ThemeMusics[nowMusicId]],
      loop: true,
      format: ['mp3'],
      autoplay: isPlaying,
    });
    setSound(soundInstance);
    return () => {
      soundInstance.unload();
    };
  }, [nowMusicId]);

  //재생, 일시정지 토글 핸들러
  const handleTogglePlay = () => {
    //유효성 검증
    if (sound) {
      if (isPlaying) {
        sound.pause();
        setIsPlaying(false);
      } else {
        sound.play();
        setIsPlaying(true);
      }
    }
  };
  //볼륨 조절 핸들러
  const handleChangeVolume = (volume: number) => {
    if (sound) {
      sound.volume(volume);
      setCurrentVolume(volume);
    }
  };

  //음악 변경 핸들러
  const handleChangeMusic = (move: string) => {
    if (move === iconPrev) {
      const backId = nowMusicId === 0 ? ThemeMusics.length - 1 : nowMusicId - 1;
      setNowMusicId(backId);
    } else if (move === iconNext) {
      const forwardId = (nowMusicId + 1) % ThemeMusics.length;
      setNowMusicId(forwardId);
    }
  };

  return (
    <Container>
      {currentPath.includes('theme/') ? (
        <>
          <AudioBtnImg
            onClick={handleTogglePlay}
            src={isPlaying ? iconPause : iconPlay}
          />
          <AudioBtnImg
            src={iconPrev}
            onClick={() => handleChangeMusic(iconPrev)}
          />
          <AudioBtnImg
            src={iconNext}
            onClick={() => handleChangeMusic(iconNext)}
          />
          {volumes.map((volume) => (
            <VolumeChangeBtnDiv
              key={volume}
              onClick={() => handleChangeVolume(volume)}
              active={volume <= currentVolume}
            />
          ))}
        </>
      ) : (
        <AudioBtnImg
          src={iconMusic}
          onClick={() => navigate('/theme')}
        ></AudioBtnImg>
      )}
    </Container>
  );
};

export default AudioPlayer;

//오디오 컨테이너
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  height: 50px;
  border-radius: 10px;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.15);
`;
//오디오 조작버튼
const AudioBtnImg = styled.img`
  width: 20px;
  height: 20px;
  padding: 5px 15px;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: padding 0.3s, background-color 0.3s;
  //버튼 크기증가 & 배경색 변화
  &:hover {
    padding: 15px;
    background-color: #e3e3e3;
  }
  //클릭 시 버튼 길이 축소외 섹상변경
  &:active {
    transition: padding 0.1s, background-color 0.1s;
    padding: 10px 15px;
    background-color: #bbddff;
  }
`;
//오디오 음량조절버튼
const VolumeChangeBtnDiv = styled.div<{ active: boolean }>`
  height: 30%;
  width: 7px;
  border: none;
  margin-right: 5px;
  background-color: ${(props) => (props.active ? 'gray' : 'white')};
  cursor: pointer;
  transition: filter 0.3s, height 0.3s;
  //어두워지고 길이가 길어짐
  &:hover {
    filter: brightness(50%);
    height: 50%;
  }
`;
