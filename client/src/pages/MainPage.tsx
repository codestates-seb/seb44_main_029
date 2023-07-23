import styled from 'styled-components';
import TitleOne from '../components/main/TitleOne';
import TitleTwo from '../components/main/TitleTwo';
import TitleThree from '../components/main/TitleThree';

import { useEffect, useState } from 'react';

const MainPage = () => {
  // 현재 감지된 페이지의 넘버입니다, 1 ~ 3
  const [observer, serObserver] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollRatio = (scrollPosition + windowHeight) / documentHeight;

      // 현재 스크롤 위치와 화면 및 문서의 세로 길이를 출력
      if (scrollRatio > 0.7) {
        serObserver(3);
      } else if (scrollRatio > 0.4) {
        serObserver(2);
      } else {
        serObserver(1);
      }
    };

    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout>
      <TitleOne />
      <TitleTwo observer={observer >= 2 ? true : false} />
      <TitleThree observer={observer === 3 ? true : false} />
    </Layout>
  );
};

export default MainPage;

const Layout = styled.div`
  width: 100%;
  height: 300vh;
  padding: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  -webkit-user-drag: none;
`;
