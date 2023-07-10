import React from 'react';
import styled, { keyframes } from 'styled-components';

interface ThemeCarouselProps {
  imgList: string[];
  currentThemeIndex: number;
  setCurrentThemeIndex: React.Dispatch<React.SetStateAction<number>>;
}

const ThemeCarousel = ({
  imgList,
  currentThemeIndex,
  setCurrentThemeIndex,
}: ThemeCarouselProps) => {
  //현재 테마 인덱스 + 1
  const handleNextTheme = () => {
    setCurrentThemeIndex((prevIndex) => (prevIndex + 1) % imgList.length);
  };
  //현재 테마 인덱스 - 1
  const handlePreviousTheme = () => {
    setCurrentThemeIndex(
      (prevIndex) => (prevIndex - 1 + imgList.length) % imgList.length
    );
  };

  return (
    <Container>
      <PreviousThemeImg
        onClick={handlePreviousTheme}
        src={imgList[(currentThemeIndex - 1 + imgList.length) % imgList.length]}
      />
      <CurrentThemeImg src={imgList[currentThemeIndex]} />
      <NextThemeImg
        onClick={handleNextTheme}
        src={imgList[(currentThemeIndex + 1) % imgList.length]}
      />
    </Container>
  );
};
export default ThemeCarousel;

//일렁이는 애니메이션
const zoomAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.01);
  }
  100% {
    transform: scale(1);
  }
`;
//페이드 아웃 애니메이션
const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.section`
  width: 100vw;
  height: 40vh;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const PreviousThemeImg = styled.img`
  width: 10vw;
  height: auto;
  object-fit: cover;
  border-radius: 0 20px 20px 0;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5);
  opacity: 0.7;
  transition: opacity 0.3s ease-in-out;
  cursor: pointer;
  //호버 시 투명도 사라짐
  &:hover {
    opacity: 1;
  }
`;

const CurrentThemeImg = styled.img`
  width: 70vw;
  height: auto;
  object-fit: cover;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  cursor: pointer;
  //일렁이는 효과 5초 무한 반복
  animation: ${zoomAnimation} 5s ease-in-out infinite;
  //페이드 아웃 1초
  animation: ${fadeInAnimation} 1s ease-in-out;
`;

const NextThemeImg = styled.img`
  width: 10vw;
  height: auto;
  object-fit: cover;
  border-radius: 20px 0 0 20px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5);
  opacity: 0.7;
  transition: opacity 0.3s ease-in-out;
  cursor: pointer;
  //호버 시 투명도 사라짐
  &:hover {
    opacity: 1;
  }
`;
