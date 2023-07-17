import styled, { keyframes } from 'styled-components';
import SlideImg from './SlideImg';

interface TitleTwoProps {
  observer: boolean;
}

const TitleTwo = ({ observer }: TitleTwoProps) => {
  return (
    <Container observer={observer}>
      <Box>
        <p>CozyState는 광고 없이,</p>
        <p>테마 속에서 즐거운 경험을 제공합니다.</p>
      </Box>
      <Box2 observer={observer}>
        <SlideImg />
      </Box2>
    </Container>
  );
};

export default TitleTwo;

const slideInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Container = styled.div<{ observer: boolean }>`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  animation: ${({ observer }) => (observer ? slideInAnimation : null)} 2s
    forwards;
  animation-fill-mode: both;
  @media (min-width: 768px) {
  }

  @media (min-width: 1024px) {
  }
`;

const Box = styled.div`
  > p {
    margin: 0;
    font-weight: bold;
  }
  @media (min-width: 300px) {
    font-size: 2rem;
  }
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Box2 = styled.div<{ observer: boolean }>`
  width: 300px;
  height: 300px;
  margin-left: 50px;
  opacity: 0;
  animation: ${({ observer }) => (observer ? slideInAnimation : null)} 2s 0.8s
    forwards;
`;
