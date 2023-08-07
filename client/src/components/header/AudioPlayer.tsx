import { Howl } from 'howler';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { GetMusic } from '../../api/api';
import TimerModal from '../theme/themeList/TimerModal';
import { IoPlay, IoPlayBack, IoPlayForward, IoPause } from 'react-icons/io5';
import { ImLoop } from 'react-icons/im';
import Spinner from '../../assets/gif/Spinner.svg';

//오디오 플레이어
const AudioPlayer = () => {
  const [sound, setSound] = useState<Howl | null>(null);
  const [musicTitle, setMusicTitle] = useState('');
  const [currentVolume, setCurrentVolume] = useState<number>(0.2);
  const [currentMusicId, setCurrentMusicId] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoop, setIsLoop] = useState<boolean>(false);
  const { themeId } = useParams();
  const volumes = Array.from(
    { length: 20 },
    (_, index) => (index + 1) / 20
  ).map((num) => parseFloat(num.toFixed(2)));
  const refetchInterval = 1 * 55 * 1000; // api요청 재요청 시간
  const checkLocalStorage =
    sessionStorage.getItem('neverOpenTimerModal') === 'true';

  // themeId가 변경될시 실행되는 쿼리
  const {
    data: musicList,
    isFetching,
    isError,
    isSuccess,
  } = useQuery([themeId], () => GetMusic(themeId), {
    enabled: Boolean(themeId), // themeId가 존재할 때만 useQuery를 활성화
    onSuccess: () => {
      console.log('GetMusic!!');
      if (currentMusicId === -1) setCurrentMusicId(0);
    },
    staleTime: 1, // 설정된 시간이 지나면 데이터를 다시 요청합니다.
    refetchInterval: refetchInterval, // 주기적인 간격으로 데이터를 자동으로 다시 요청합니다.
  });

  useEffect(() => {
    // themeId가 변경되었을 때에만 실행될 코드를 작성합니다.
    setCurrentMusicId(-1);
    console.log('themeId changed!', themeId);
    if (isPlaying) {
      handleTogglePlay(); // 자동재생중이면 끄기
      console.log('게다가 자동재생중!', themeId);
    }
  }, [themeId]);

  // // 경로 변경시
  // useEffect(() => {
  //   // 음원재생이 없는 경로일 경우
  //   if (!themeId) {
  //     setCurrentMusicId(-1); // 음원 고유아이디 -1로 설정 (못쓰게)
  //     console.log('themeId 가 없다!!', themeId);
  //   }
  // }, [location]);

  //음원 변경 & 음원리스트 변경시 새로운 인스턴스 생성 & 중복생성을 방지 하기위한 useEffect 로직
  useEffect(() => {
    if (musicList && musicList.length > 0) {
      //상태정보 바탕으로 인스턴스 생성
      const soundInstance = new Howl({
        src: [musicList[currentMusicId]],
        loop: true,
        format: ['mp3'],
        autoplay: isPlaying,
        volume: currentVolume,
      });
      // "end" 이벤트 핸들러 등록
      soundInstance.on('end', handleMusicEnd);
      // 음원 등록
      setSound(soundInstance);
      // url에서 title추출 후 등록
      const url = musicList[currentMusicId];
      const title = getMusicTitleFromUrl(url);
      setMusicTitle(title);
      // useEffect재실행 시 인스턴스 삭제
      return () => {
        soundInstance.unload();
      };
    }
  }, [currentMusicId]);

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
      if (next) {
        const nextId = (currentMusicId + 1) % musicList.length;
        setCurrentMusicId(nextId);
      } else {
        //이전 곡
        const preId =
          currentMusicId === 0 ? musicList.length - 1 : currentMusicId - 1;
        setCurrentMusicId(preId);
      }
    }
  };

  //재생, 일시정지 토글 핸들러
  const handleTogglePlay = () => {
    //음원 인스턴스가 있다면
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
    //음원 인스턴스가 있다면
    if (sound) {
      sound.volume(volume);
      setCurrentVolume(volume);
    }
  };

  // const handleToggleLoop = () => {
  //   if (sound) {
  //     if (isLoop) {
  //       setIsLoop(false);
  //       sound.loop(false);
  //     } else {
  //       setIsLoop(true);
  //       sound.loop(true);
  //     }
  //   }
  // };

  // "end" 이벤트 핸들러
  const handleMusicEnd = () => {
    if (!isLoop && musicList && musicList.length > 0) {
      // 현재 곡이 마지막 곡이 아닌 경우에만 다음 곡으로 이동
      const nextId = (currentMusicId + 1) % musicList.length;
      setCurrentMusicId(nextId);
    }
  };
  return (
    <Container>
      {musicList && musicList.length > 0 ? (
        <>
          {!isPlaying && !checkLocalStorage && (
            <TimerModal handleTogglePlay={handleTogglePlay} />
          )}

          <S_IoPlayBack onClick={() => handleChangeMusic(false)} />
          {isPlaying ? (
            <S_IoPause onClick={handleTogglePlay} />
          ) : (
            <S_IoPlay onClick={handleTogglePlay} />
          )}
          <S_IoPlayForward onClick={() => handleChangeMusic(true)} />
          {/* <S_ImLoop isLoop={isLoop} onClick={() => handleToggleLoop()} /> */}
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
      ) : (
        <TitleP>CoztStates</TitleP>
      )}
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

const TitleP = styled.p`
  color: white;
  font-weight: bold;
`;

//오디오 컨테이너
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 10px 0;
  z-index: 99;
  margin-left: 50px;
  @media (min-width: 300px) {
    margin-left: 0;
    height: 30px;
  }

  @media (min-width: 768px) {
    margin-left: 50px;
    height: 40px;
  }
`;

//오디오 음량조절버튼
const VolumeChangeBtnDiv = styled.div<{ active: boolean }>`
  width: 7px;
  border: none;
  margin-right: 2px;
  background-color: ${(props) =>
    props.active ? 'white' : 'rgba(255, 255, 255, 0.3)'};
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

  @media (min-width: 1024px) {
    display: flex;
    height: 40%;
  }
`;

const MusicTitleContainerdiv = styled.div`
  color: white;
  overflow: hidden;
  border-radius: 100px;
  margin-left: 10px;
  width: 200px;
  padding: 3px 0;
  background-color: rgba(255, 255, 255, 0.1);
`;

const MusicTitleDiv = styled.div`
  color: white;
  width: 250px;
  animation: ${marquee} 6s linear infinite;
  > p {
    margin: 0;
    font-weight: bold;
    font-size: 12px;
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

const S_ImLoop = styled(ImLoop)<{ isLoop: boolean }>`
  height: 26px;
  width: auto;
  padding: 0 12px;
  margin-right: 12px;
  border-radius: 5px;
  cursor: pointer;
  color: ${(prop) => (prop.isLoop ? 'white' : 'rgba(255, 255, 255, 0.3)')};
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
