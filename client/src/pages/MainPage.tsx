import styled, { keyframes } from 'styled-components';
import backgroundImg from '../assets/images/background.jpg';
import Title from '../components/main/Title';
import { BiChevronsDown } from 'react-icons/bi';

const MainPage = () => {
  return (
    <Layout>
      <Title />
      <AnimationDiv size="50px" color="white" />
    </Layout>
  );
};

export default MainPage;
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
  height: 100vh;
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
  margin-bottom: 10px;
  opacity: 0;
  animation: ${fadeInAnimation} 1s ease-in-out 3s forwards,
    ${moveUpDown} 2s ease-in-out infinite;
`;
