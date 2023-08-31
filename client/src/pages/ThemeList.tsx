import ThemeCarousel from '../components/theme/themeList/ThemeCarousel';
import styled, { keyframes } from 'styled-components';
import gif1 from '../assets/theme/1.gif';
import gif2 from '../assets/theme/2.gif';
import gif3 from '../assets/theme/3.gif';
import gif4 from '../assets/theme/4.gif';
import gif5 from '../assets/theme/5.gif';
import { useState } from 'react';
import EmblaCarousel from '../components/theme/themeList/Carousel';
import { EmblaOptionsType } from 'embla-carousel-react';

const ThemeList = () => {
  const themeData = [
    {
      src: gif1,
      title: 'Nature',
      content: '아름다운 자연 풍경',
    },
    {
      src: gif2,
      title: 'Space',
      content: '우주의 무한함',
    },
    {
      src: gif3,
      title: 'Animal',
      content: '다양한 동물의 귀여운 매력',
    },
    {
      src: gif4,
      title: 'Pixel',
      content: '화려한 픽셀 아트의 세계',
    },
    {
      src: gif5,
      title: 'Retro',
      content: '과거로 돌아가는 레트로 감성',
    },
  ];
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const gifList = themeData.map((el) => el.src);
  const currentThemeImageUrl = gifList[currentThemeIndex];

  const OPTIONS: EmblaOptionsType = { loop: true };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  return (
    <Layout>
      <SandboxCarousel>
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </SandboxCarousel>
    </Layout>
  );
};

export default ThemeList;

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  height: 100vh;
`;

export const SandboxCarousel = styled.div``;
