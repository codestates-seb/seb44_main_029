import { Howl } from 'howler';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import iconPlay from '../../assets/icon/iconPlay.png';
import iconPrev from '../../assets/icon/iconPrev.png';
import iconNext from '../../assets/icon/iconNext.png';
import iconPause from '../../assets/icon/iconPause.png';
import styled from 'styled-components';
import iconMusic from '../../assets/icon/icon_music.png';
import API from '../../api/index';
import axios from 'axios';

//오디오 플레이어
const AudioPlayer = () => {
  const soundSource = [
    'https://cozystates-bucket-01.s3.ap-northeast-2.amazonaws.com/1-1.mp3',
    'https://cozystates-bucket-01.s3.ap-northeast-2.amazonaws.com/1-2.mp3',
    'https://cozystates-bucket-01.s3.ap-northeast-2.amazonaws.com/1-3.mp3',
  ];
  const volumes = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Howl | null>(null);
  const [currentVolume, setCurrentVolume] = useState<number>(0.5);
  const [ThemeMusics, setThemeMusics] = useState(soundSource);
  const [nowMusicId, setNowMusicId] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;

  useEffect(() => {
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

    axios
      .get('https://076f-175-208-216-56.ngrok-free.app/theme/2/music/list', {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      })
      .then((res) => {
        setThemeMusics(res.data);
        console.log(ThemeMusics);
      })
      .catch((error) => console.log(error));
  }, []);

  //play() 메소드 실행마다 인스턴스 생성을 방지 하기위한 useEffect 로직
  useEffect(() => {
    if (isPlaying) {
      setAutoPlay(true);
    } else {
      setAutoPlay(false);
    }
    const soundInstance = new Howl({
      src: [ThemeMusics[nowMusicId]],
      loop: true,
      format: ['mp3'],
      autoplay: autoPlay,
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
        setAutoPlay(false);
      } else {
        sound.play();
        setIsPlaying(true);
        setAutoPlay(true);
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
