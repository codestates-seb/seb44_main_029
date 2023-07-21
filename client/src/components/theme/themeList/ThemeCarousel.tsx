import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
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
  const navigate = useNavigate();

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
      <PreviousDiv>
        <FiChevronsLeft />
        <PreviousThemeImg
          onClick={handlePreviousTheme}
          src={
            imgList[(currentThemeIndex - 1 + imgList.length) % imgList.length]
          }
        />
      </PreviousDiv>
      <CurrentThemeImg
        src={imgList[currentThemeIndex]}
        onClick={() => {
          navigate(`/theme/${currentThemeIndex + 1}`);
        }}
      />
      <NextDiv>
        <FiChevronsRight />
        <NextThemeImg
          onClick={handleNextTheme}
          src={imgList[(currentThemeIndex + 1) % imgList.length]}
        />
      </NextDiv>
    </Container>
  );
};
export default ThemeCarousel;

//오른쪽으로 이동
const moveLeftRight = keyframes`
  0%,100% {
    transform: translateX(0); 
  }
  50% {
    transform: translateX(2px); 
  }
`;

//왼쪽으로 이동
const moveLeftLeft = keyframes`
  0%,100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-2px); 
  }
`;

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
  @media (min-width: 300px) {
    height: 60vh;
  }
  @media (min-width: 768px) {
    height: 40vh;
  }
  @media (min-width: 1024px) {
    height: 40vh;
  }
`;

const PreviousThemeImg = styled.img`
  width: 10vw;
  height: auto;
  object-fit: cover;
  border-radius: 0 20px 20px 0;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5);
  opacity: 0.7;
  transition: opacity 0.3s ease-in-out;
  -webkit-user-drag: none;
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
  -webkit-user-drag: none;
  cursor: pointer;
  animation: ${zoomAnimation} 5s ease-in-out infinite,
    ${fadeInAnimation} 1s ease-in-out;
`;

const NextThemeImg = styled.img`
  width: 10vw;
  height: auto;
  object-fit: cover;
  border-radius: 20px 0 0 20px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5);
  opacity: 0.7;
  transition: opacity 0.3s ease-in-out;
  -webkit-user-drag: none;
  cursor: pointer;
  //호버 시 투명도 사라짐
  &:hover {
    opacity: 1;
  }
`;

const PreviousDiv = styled.div`
  display: flex;
  align-items: center;
  &:hover {
    :first-child {
      opacity: 1;
    }
  }
  //화실표 아이콘
  > :first-child {
    opacity: 0;
    position: absolute;
    z-index: 200;
    scale: 5;
    left: 2%;
    color: white;
    animation: ${moveLeftLeft} 2s linear infinite;
    @media (min-width: 300px) {
      scale: 2;
    }
    @media (min-width: 768px) {
      scale: 3;
    }
    @media (min-width: 1024px) {
      scale: 4;
    }
  }
  > :last-child {
    height: 100%;
  }
`;

const NextDiv = styled.div`
  display: flex;
  align-items: center;
  &:hover {
    :first-child {
      opacity: 1;
    }
  }
  //화실표 아이콘
  > :first-child {
    opacity: 0;
    position: absolute;
    z-index: 200;
    scale: 5;
    right: 2%;
    color: white;
    animation: ${moveLeftRight} 2s linear infinite;
    @media (min-width: 300px) {
      scale: 2;
    }
    @media (min-width: 768px) {
      scale: 3;
    }
    @media (min-width: 1024px) {
      scale: 4;
    }
  }
  > :last-child {
    height: 100%;
  }
`;
