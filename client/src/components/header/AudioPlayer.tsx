import { Howl } from 'howler';
import { useState, useEffect } from 'react';
import iconPlay from '../../assets/icon/iconPlay.png';
import iconForward from '../../assets/icon/iconForward.png';
import iconBack from '../../assets/icon/iconBack.png';
import iconPause from '../../assets/icon/iconPause.png';
import styled from 'styled-components';

const AudioPlayer = () => {
  const soundSource =
    'https://p.scdn.co/mp3-preview/0ba9d38f5d1ad30f0e31fc8ee80c1bebf0345a0c';
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
  box-shadow: 3px 3px 3px 0px;
`;

//오디오 버튼요소
const AudioBtnImg = styled.img`
  width: 20px;
  height: 20px;
  padding: 1px;
  margin-right: 10px;
  cursor: pointer;
  //호버시 버튼크기 증가
  &:hover {
    width: 22px;
    height: 22px;
    padding: 0px;
  }
`;

//오디오 음량요소
const VolumeChangeBtnDiv = styled.div<{ active: boolean }>`
  height: 30%;
  width: 6px;
  border: none;
  margin-right: 4px;
  background-color: ${(props) => (props.active ? 'black' : 'white')};
  cursor: pointer;
  border: 2px solid;
  //호버시 어두워짐
  &:hover {
    filter: brightness(80%);
  }
`;
