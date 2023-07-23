import styled, { keyframes } from 'styled-components';
import { BiChevronsDown } from 'react-icons/bi';

type props = {
  currentPage: number;
};

const MoveNextcurrentPage = ({ currentPage }: props) => {
  //다음 타이틀로 이동
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight * currentPage,
      behavior: 'smooth',
    });
  };
  return (
    <Contaner
      size="50px"
      color="white"
      currentPage={currentPage}
      onClick={handleScrollDown}
    />
  );
};

export default MoveNextcurrentPage;

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
    transform: translateY(-5px);
  }
`;

const Contaner = styled(BiChevronsDown)<{ currentPage: number }>`
  position: absolute;
  bottom: ${(props) => (props.currentPage - 1) * -100}%;
  opacity: 0;
  margin-bottom: 5px;
  cursor: pointer;
  animation: ${fadeInAnimation} 1s ease-in-out 3s forwards,
    ${moveUpDown} 2s ease-in-out infinite;
`;
