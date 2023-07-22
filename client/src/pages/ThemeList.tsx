import ThemeCarousel from '../components/theme/themeList/ThemeCarousel';
import styled, { keyframes } from 'styled-components';
import img1 from '../assets/theme/1.png';
import img2 from '../assets/theme/2.png';
import img3 from '../assets/theme/3.png';
import img4 from '../assets/theme/4.png';
import img5 from '../assets/theme/5.png';
import { useState } from 'react';

const ThemeList = () => {
  const themeData = [
    {
      src: img1,
      title: '산속길',
      content:
        ' 산 속으로 들어가 싱그러운 공기를 마시며 아름다운 자연 풍경을 감상해요.',
    },
    { src: img2, title: '르네상스', content: '테마 내용2 입니다' },
    { src: img3, title: '우주', content: '테마 내용3 입니다' },
    { src: img4, title: '바다와 파도', content: '테마 내용4 입니다' },
    { src: img5, title: '도시의 밤', content: '테마 내용5 입니다' },
  ];
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const imgList = themeData.map((el) => el.src);
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
        <h1>{themeData[currentThemeIndex].title}</h1>
        <p>{themeData[currentThemeIndex].content}</p>
      </TextContainer>
    </Layout>
  );
};

export default ThemeList;
//페이드 아웃 애니메이션
const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  50%{
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Layout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
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
  transform: scale(1.02);
`;

const TextContainer = styled.section`
  width: 70vw;
  height: 20vh;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //페이드 아웃 1.5초
  animation: ${fadeInAnimation} 1.5s ease-in-out;
  > h1 {
    font-size: 250%;
  }
  > p {
    font-weight: bold;
  }
`;
