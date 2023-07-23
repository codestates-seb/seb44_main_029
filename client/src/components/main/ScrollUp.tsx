import styled, { keyframes } from 'styled-components';
import { BiChevronsUp } from 'react-icons/bi';

const ScrollUp = () => {
  //다음 타이틀로 이동
  const handleScrollDown = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return <Contaner color="white" onClick={handleScrollDown} />;
};

export default ScrollUp;

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
    transform: translateY(5px);
  }
`;

const Contaner = styled(BiChevronsUp)`
  position: absolute;
  bottom: -200%;
  opacity: 1;
  right: 0;
  cursor: pointer;
  animation: ${fadeInAnimation} 1s ease-in-out 3s forwards,
    ${moveUpDown} 2s ease-in-out infinite;
  @media (min-width: 300px) {
    font-size: 30px;
  }
  @media (min-width: 500px) {
    font-size: 40px;
  }
  @media (min-width: 768px) {
    font-size: 50px;
  }
`;
