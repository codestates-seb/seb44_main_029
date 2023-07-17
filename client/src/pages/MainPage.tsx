import styled, { keyframes } from 'styled-components';
import TitleOne from '../components/main/TitleOne';
import TitleTwo from '../components/main/TitleTwo';
import { BiChevronsDown } from 'react-icons/bi';

const MainPage = () => {
  //다음 타이틀로 이동
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };
  return (
    <Layout>
      <TitleOne />
      <TitleTwo />
      <AnimationDiv size="50px" color="white" onClick={handleScrollDown} />
    </Layout>
  );
};

export default MainPage;
//페이드 인
const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const moveUpDown = keyframes`
  50% {
    transform: translateY(-10px);
  }
`;

const Layout = styled.div`
  width: 100%;
  height: 200vh;
  padding: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const AnimationDiv = styled(BiChevronsDown)`
  position: absolute;
  bottom: 0;
  margin-bottom: 10px;
  opacity: 0;
  animation: ${fadeInAnimation} 1s ease-in-out 3s forwards,
    ${moveUpDown} 2s ease-in-out infinite;
`;
