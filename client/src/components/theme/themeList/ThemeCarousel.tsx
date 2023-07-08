import React, { useState } from 'react';
import styled from 'styled-components';
import img1 from '../../../assets/theme/1.png';
import img2 from '../../../assets/theme/2.png';
import img3 from '../../../assets/theme/3.png';

const ThemeCarousel = () => {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

  const themes = [img1, img2, img3];

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
  height: 50vh;
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const CenteredContainer = styled.div`
  width: 60vw;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const PreviousThemeImg = styled.img`
  width: 10vw;
  height: auto;
  object-fit: cover;
  opacity: 0.5;
  border-radius: 0 20px 20px 0;
  transition: opacity 0.3s ease-in-out;
`;

const CurrentThemeImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  margin: 0 10vw;
  border-radius: 20px;
  transition: margin 0.3s ease-in-out;
  transform-style: preserve-3d;
  transform: perspective(1000px);
`;

const NextThemeImg = styled.img`
  width: 10vw;
  height: auto;
  object-fit: cover;
  opacity: 0.5;
  border-radius: 20px 0 0 20px;
  transition: opacity 0.3s ease-in-out;
`;
