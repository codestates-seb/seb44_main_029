import { Howl } from 'howler';
import { useState, useEffect } from 'react';
import iconPlay from '../../assets/icon/iconPlay.png';
import iconForward from '../../assets/icon/iconForward.png';
import iconBack from '../../assets/icon/iconBack.png';
import iconPause from '../../assets/icon/iconPause.png';
import styled from 'styled-components';

//오디오 플레이어
const AudioPlayer = () => {
  const soundSource =
    'https://cozystates-bucket-01.s3.ap-northeast-2.amazonaws.com/1.mp3';
  const volumes = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Howl | null>(null);
  const [currentVolume, setCurrentVolume] = useState<number>(0.5);

  //play() 메소드 실행마다 인스턴스 생성을 방지 하기위한 useEffect 로직
  useEffect(() => {
    const soundInstance = new Howl({
      src: [soundSource],
      loop: true,
      format: ['mp3'],
    });
    setSound(soundInstance);

    return () => {
      soundInstance.unload();
    };
  }, []);

  //재생, 일시정지 토글 핸들러 (추후 전역변수 사용)
  const handleTogglePlay = () => {
    //유효성 검증
    if (sound) {
      if (isPlaying) {
        sound.pause();
      } else {
        sound.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  //볼륨 조절 핸들러
  const handleChangeVolume = (volume: number) => {
    if (sound) {
      sound.volume(volume);
      setCurrentVolume(volume);
    }
  };

  return (
    <Container>
      <AudioBtnImg
        onClick={handleTogglePlay}
        src={isPlaying ? iconPause : iconPlay}
      />
      <AudioBtnImg src={iconForward} />
      <AudioBtnImg src={iconBack} />
      {volumes.map((volume) => (
        <VolumeChangeBtnDiv
          key={volume}
          onClick={() => handleChangeVolume(volume)}
          active={volume <= currentVolume}
        />
      ))}
    </Container>
  );
};

export default AudioPlayer;

//오디오 컨테이너
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  height: 100%;
  border-radius: 10px;
`;

//오디오 조작버튼
const AudioBtnImg = styled.img`
  width: 20px;
  height: 20px;
  padding: 2px;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: width 0.3s, height 0.3s, padding 0.5s;
  //버튼 크기증가 & 배경색 변화
  &:hover {
    width: 24px;
    height: 24px;
    padding: 10px;
    background-color: #e3e3e3;
  }
`;

//오디오 음량조절버튼
const VolumeChangeBtnDiv = styled.div<{ active: boolean }>`
  height: 35%;
  width: 8px;
  border: none;
  margin-right: 4px;
  border: 2px solid;
  background-color: ${(props) => (props.active ? 'black' : 'white')};
  cursor: pointer;
  transition: filter 0.5s, height 0.3s;
  //어두워지고 길이가 길어짐
  &:hover {
    filter: brightness(80%);
    height: 50%;
  }
`;
