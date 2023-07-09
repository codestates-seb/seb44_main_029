import React from 'react';
import styled from 'styled-components';

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
      <CenteredContainer>
        <PreviousThemeImg
          onClick={handlePreviousTheme}
          src={themes[(currentThemeIndex - 1 + themes.length) % themes.length]}
        />
        <CurrentThemeImg src={themes[currentThemeIndex]} />
        <NextThemeImg
          onClick={handleNextTheme}
          src={themes[(currentThemeIndex + 1) % themes.length]}
        />
      </CenteredContainer>
    </Container>
  );
};

export default ThemeCarousel;

const Container = styled.section`
  height: 40vh;
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const CenteredContainer = styled.div`
  width: 70vw;
  height: 100%;
  display: flex;
  justify-content: center;
  border-radius: 20px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5);
`;

const PreviousThemeImg = styled.img`
  width: 10vw;
  height: auto;
  object-fit: cover;
  border-radius: 0 20px 20px 0;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5);
`;

const CurrentThemeImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  margin: 0 10vw;
  border-radius: 20px;
`;

const NextThemeImg = styled.img`
  width: 10vw;
  height: auto;
  object-fit: cover;
  border-radius: 20px 0 0 20px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5);
`;
