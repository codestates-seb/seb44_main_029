import styled, { keyframes } from 'styled-components';

interface TitleTwoProps {
  observer: boolean;
}

const TitleTwo = ({ observer }: TitleTwoProps) => {
  const onAnimationEnd = () => {
    // 애니메이션 종료 후 처리할 작업을 여기에 추가하세요
  };

  return (
    <Container observer={observer} onAnimationEnd={onAnimationEnd}>
      <Box />
    </Container>
  );
};

export default TitleTwo;

const slideInAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const slideOutAnimation = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Container = styled.div<{ observer: boolean }>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${({ observer }) =>
      observer ? slideInAnimation : slideOutAnimation}
    1s forwards;
  color: ${({ observer }) => (observer ? 'red' : 'inherit')};
  animation-fill-mode: both;
  @media (min-width: 768px) {
  }

  @media (min-width: 1024px) {
  }
`;

const Box = styled.div`
  width: 300px;
  height: 300px;
  background-color: red;
`;
