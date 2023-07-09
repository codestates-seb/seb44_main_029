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
  const themes: string[] = imgList;

  const handleNextTheme = () => {
    setCurrentThemeIndex((prevIndex) => (prevIndex + 1) % themes.length);
  };

  const handlePreviousTheme = () => {
    setCurrentThemeIndex(
      (prevIndex) => (prevIndex - 1 + themes.length) % themes.length
    );
  };

  return (
    <Container>
      <PreviousThemeImg
        onClick={handlePreviousTheme}
        src={themes[(currentThemeIndex - 1 + themes.length) % themes.length]}
      />
      <CurrentThemeImg src={themes[currentThemeIndex]} />
      <NextThemeImg
        onClick={handleNextTheme}
        src={themes[(currentThemeIndex + 1) % themes.length]}
      />
    </Container>
  );
};

export default ThemeCarousel;

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
  animation: ${zoomAnimation} 4s ease-in-out infinite;
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

  &:hover {
    opacity: 1;
  }
`;
