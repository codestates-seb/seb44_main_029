import { Howl } from 'howler';
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { GetMusic } from '../../api/api';
import TimerModal from '../theme/themeList/TimerModal';
import { IoPlay, IoPlayBack, IoPlayForward, IoPause } from 'react-icons/io5';
import Spinner from '../../assets/gif/Spinner.svg';

//오디오 플레이어
const AudioPlayer = () => {
  const [sound, setSound] = useState<Howl | null>(null);
  const [musicTitle, setMusicTitle] = useState('');
  const [currentVolume, setCurrentVolume] = useState<number>(0.5);
  const [nowMusicId, setNowMusicId] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const { themeId } = useParams();
  const location = useLocation();
  const volumes = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
  const refetchInterval = 1 * 55 * 1000;
  const checkLocalStorage =
    localStorage.getItem('neverOpenTimerModal') === 'true';

  // themeId가 변경될시 실행되는 쿼리
  const {
    data: musicList,
    isFetching,
    isError,
    isSuccess,
  } = useQuery([themeId], () => GetMusic(themeId), {
    enabled: Boolean(themeId), // themeId가 존재할 때만 useQuery를 활성화
    onSuccess: () => {
      console.log('GetMusic Success');
    },
    staleTime: refetchInterval, // 설정된 시간이 지나면 데이터를 다시 요청합니다.
    refetchInterval: refetchInterval, // 주기적인 간격으로 데이터를 자동으로 다시 요청합니다.
  });
  // 경로 변경시
  useEffect(() => {
    if (!themeId && isPlaying) handleTogglePlay(); // 자동재생중이면 끄기
  }, [location]);

  //음원 변경 & 음원리스트 변경시 새로운 인스턴스 생성 & 중복생성을 방지 하기위한 useEffect 로직
  useEffect(() => {
    if (musicList && musicList.length > 0) {
      const soundInstance = new Howl({
        src: [musicList[nowMusicId]],
        loop: true,
        format: ['mp3'],
        autoplay: isPlaying,
      });
      // 음원 등록
      setSound(soundInstance);
      const url = musicList[nowMusicId];
      const title = getMusicTitleFromUrl(url);
      setMusicTitle(title);
      // 음원 제목 등록
      return () => {
        soundInstance.unload();
      };
    }
  }, [nowMusicId, musicList]);

  // URL에서 MusicTitle을 추출해서 상태를 변경하는 함수
  const getMusicTitleFromUrl = (url: string) => {
    if (!url) return '다음곡을 재생해 주세요!';
    // URL에서 '?' 이후의 쿼리 파라미터를 제거하고, '/'로 분리하여 배열로 만든다
    const pathSegments = url.split('?')[0].split('/');
    // 배열의 마지막 요소는 파일 이름
    const fileName = pathSegments[pathSegments.length - 1];
    // fileName에사 .mp3 제거버전
    const removeMp3 = fileName.split('.')[0];
    // 정상적으로 보이도록 하기위한 디코딩과정
    const decodedFileName = decodeURIComponent(removeMp3);
    return decodedFileName;
  };

  //음원 변경 핸들러
  const handleChangeMusic = (next: boolean) => {
    //API호출 성공시에만.
    if (isSuccess) {
      if (!next) {
        const backId = nowMusicId === 0 ? musicList.length - 1 : nowMusicId - 1;
        setNowMusicId(backId);
      } else {
        const forwardId = (nowMusicId + 1) % musicList.length;
        setNowMusicId(forwardId);
      }
    }
  };

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
    //유효성 검증
    if (sound) {
      sound.volume(volume);
      setCurrentVolume(volume);
    }
  };

  return (
    <Container>
      {musicList && musicList.length > 0 ? (
        <>
          {!isPlaying && !checkLocalStorage && (
            <TimerModal handleTogglePlay={handleTogglePlay} />
          )}
          {isPlaying ? (
            <S_IoPause onClick={handleTogglePlay} />
          ) : (
            <S_IoPlay onClick={handleTogglePlay} />
          )}
          <S_IoPlayBack onClick={() => handleChangeMusic(false)} />
          <S_IoPlayForward onClick={() => handleChangeMusic(true)} />
          {volumes.map((volume) => (
            <VolumeChangeBtnDiv
              key={volume}
              onClick={() => handleChangeVolume(volume)}
              active={volume <= currentVolume}
            />
          ))}
          <MusicTitleContainerdiv>
            <MusicTitleDiv>
              <p>{musicTitle}</p>
            </MusicTitleDiv>
          </MusicTitleContainerdiv>
        </>
      ) : isFetching ? (
        <SpinnerImg src={Spinner} />
      ) : isError ? (
        <>API 실패</>
      ) : null}
    </Container>
  );
};

export default AudioPlayer;

// 무한으로 텍스트를 한 방향으로 움직이는 애니메이션 키프레임을 정의합니다.
const marquee = keyframes`
  0% {
    transform: translateX(100%); /* 시작 위치 (0px) */
  }
  100% {
    transform: translateX(-100%); /* 목표 위치 (-100%만큼 왼쪽으로 이동) */
  }
`;

//오디오 컨테이너
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  height: 50px;
  border-radius: 0 0 10px 0;
  z-index: 99;
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
  @media (min-width: 300px) {
    display: none;
  }

  @media (min-width: 450px) {
    display: flex;
  }
`;

const MusicTitleContainerdiv = styled.div`
  color: white;
  overflow: hidden;
`;

const MusicTitleDiv = styled.div`
  color: white;
  animation: ${marquee} 5s linear infinite;
  @media (min-width: 300px) {
    display: none;
  }

  @media (min-width: 768px) {
    display: flex;
  }
`;
const S_IoPlay = styled(IoPlay)`
  height: 26px;
  width: auto;
  padding: 0 12px;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  transition: padding 0.3s, background-color 0.3s;
  //버튼 크기증가 & 배경색 변화
  &:hover {
    padding: 12px;
    background-color: #e3e3e3;
  }
  //클릭 시 버튼 길이 축소외 섹상변경
  &:active {
    transition: padding 0.1s, background-color 0.1s;
    padding: 10px 12px;
    background-color: #bbddff;
  }
`;

const S_IoPlayForward = styled(IoPlayForward)`
  height: 26px;
  width: auto;
  padding: 0 12px;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  transition: padding 0.3s, background-color 0.3s;
  //버튼 크기증가 & 배경색 변화
  &:hover {
    padding: 12px;
    background-color: #e3e3e3;
  }
  //클릭 시 버튼 길이 축소외 섹상변경
  &:active {
    transition: padding 0.1s, background-color 0.1s;
    padding: 10px 12px;
    background-color: #bbddff;
  }
`;
const S_IoPlayBack = styled(IoPlayBack)`
  height: 26px;
  width: auto;
  padding: 0 12px;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  transition: padding 0.3s, background-color 0.3s;
  //버튼 크기증가 & 배경색 변화
  &:hover {
    padding: 12px;
    background-color: #e3e3e3;
  }
  //클릭 시 버튼 길이 축소외 섹상변경
  &:active {
    transition: padding 0.1s, background-color 0.1s;
    padding: 10px 12px;
    background-color: #bbddff;
  }
`;

const S_IoPause = styled(IoPause)`
  height: 26px;
  width: auto;
  padding: 0 12px;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  transition: padding 0.3s, background-color 0.3s;
  //버튼 크기증가 & 배경색 변화
  &:hover {
    padding: 12px;
    background-color: #e3e3e3;
  }
  //클릭 시 버튼 길이 축소외 섹상변경
  &:active {
    transition: padding 0.1s, background-color 0.1s;
    padding: 10px 12px;
    background-color: #bbddff;
  }
`;

const SpinnerImg = styled.img`
  width: 100px;
  color: white;
`;
