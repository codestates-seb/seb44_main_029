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
      <TextContainer>
        <h1>테마 제목 입니다.</h1>
        <p>
          심신의 안정을 가져다 주는 코지스테이츠의 테마가 머시지 저시기 궁시렁
          궁시렁....
        </p>
      </TextContainer>
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
  width: 70vw;
  height: 20vh;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > h1 {
    font-size: 200%;
  }
`;
