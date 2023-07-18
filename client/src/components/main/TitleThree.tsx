import styled, { keyframes } from 'styled-components';

const TitleThree = ({ observer }: { observer: boolean }) => {
  const onAnimationEnd = () => {
    // 애니메이션 종료 후 처리할 작업을 여기에 추가하세요
  };

  return (
    <Container observer={observer} onAnimationEnd={onAnimationEnd}>
      <Box observer={observer} />
    </Container>
  );
};

export default TitleThree;

const slideInAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(-30%);
  }
`;
const slideInAnimation2 = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    opacity: 1;
    transform: translateX(0%);
    padding-right: 0px

  }
  100% {
    opacity: 1;
    padding-right:100px;
  }
`;

const slideOutAnimation = keyframes`
  100% {
    opacity: 0;
  }
`;

const Container = styled.div<{ observer: boolean }>`
  width: 100%;
  height: 100vh;
  display: flex;
  border-top: 10px solid white;
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

const Box = styled.div<{ observer: boolean }>`
  width: 300px;
  height: 300px;
  opacity: 0.1;
  background-color: red;
  animation: ${({ observer }) =>
      observer ? slideInAnimation2 : slideOutAnimation}
    1s 1s forwards;
`;
