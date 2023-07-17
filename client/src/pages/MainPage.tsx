import styled, { keyframes } from 'styled-components';
import TitleOne from '../components/main/TitleOne';
import TitleTwo from '../components/main/TitleTwo';
import TitleThree from '../components/main/TitleThree';
import { BiChevronsDown } from 'react-icons/bi';
import backgroundImg from '../assets/images/background.jpg';

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
      <TitleThree />
      <AnimationDiv size="50px" color="white" onClick={handleScrollDown} />
    </Layout>
  );
};

export default MainPage;
//페이드 인 애니메이션
const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
// 위아래 이동 애니메이션
const moveUpDown = keyframes`
  50% {
    transform: translateY(-10px);
  }
`;

const Layout = styled.div`
  width: 100%;
  height: 300vh;
  padding: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const AnimationDiv = styled(BiChevronsDown)`
  position: absolute;
  bottom: 0;
  margin-bottom: 10px;
  opacity: 0;
  animation: ${fadeInAnimation} 1s ease-in-out 3s forwards,
    ${moveUpDown} 2s ease-in-out infinite;
`;
