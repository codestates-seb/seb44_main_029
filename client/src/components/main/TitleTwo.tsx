import styled, { keyframes } from 'styled-components';
import SlideImg from './SlideImg';
import { useNavigate } from 'react-router-dom';

interface TitleTwoProps {
  observer: boolean;
}

const TitleTwo = ({ observer }: TitleTwoProps) => {
  const navigete = useNavigate();
  return (
    <Container>
      <Box observer={observer}>
        <p>CozyState는 광고 없이,</p>
        <p>테마 속에서 즐거운 경험을 제공합니다.</p>
      </Box>
      <Box2 observer={observer} onClick={() => navigete('/theme')}>
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
const slideOutAnimation = keyframes`
  100% {
    opacity: 0;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  background-color: black;
  @media (min-width: 768px) {
  }

  @media (min-width: 1024px) {
  }
`;

const Box = styled.div<{ observer: boolean }>`
  display: flex;
  flex-direction: column;
  opacity: 0;
  margin-bottom: 50px;
  animation: ${({ observer }) =>
      observer ? slideInAnimation : slideOutAnimation}
    1.5s forwards;
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
  width: 60vw;
  height: 20vh;
  margin: 15vh 0;
  opacity: 0;
  animation: ${({ observer }) => (observer ? slideInAnimation : null)} 1s 0.8s
    forwards;
  transition: height 0.3s, margin 0.3s;
  &:hover {
    margin: 0;
    height: 50vh;
  }
`;
