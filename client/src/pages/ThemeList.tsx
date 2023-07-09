import ThemeCarousel from '../components/theme/themeList/ThemeCarousel';
import styled from 'styled-components';
import img1 from '../assets/theme/1.png';
import img2 from '../assets/theme/2.png';
import img3 from '../assets/theme/3.png';
import img4 from '../assets/theme/4.png';
import img5 from '../assets/theme/5.png';
import { useState } from 'react';

const ThemeList = () => {
  const imgList = [img1, img2, img3, img4, img5];
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const currentThemeImageUrl = imgList[currentThemeIndex];

  return (
    <Layout>
      <BlurredBackground imageUrl={currentThemeImageUrl} />
      <ThemeCarousel
        imgList={imgList}
        currentThemeIndex={currentThemeIndex}
        setCurrentThemeIndex={setCurrentThemeIndex}
      />
      <TextContainer />
    </Layout>
  );
};

export default ThemeList;

const Layout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const BlurredBackground = styled.div<{ imageUrl: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-repeat: no-repeat;
  filter: blur(5px);
  z-index: -1;
`;

const TextContainer = styled.section`
  width: 60vw;
  height: 20vh;
  border: 1px solid;
`;
