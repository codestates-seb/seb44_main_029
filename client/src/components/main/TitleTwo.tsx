import styled, { keyframes } from 'styled-components';
import SlideImg from './SlideImg';
import { useNavigate } from 'react-router-dom';
import MoveNextPage from './MoveNextPage';

interface TitleTwoProps {
  observer: boolean;
}

const TitleTwo = ({ observer }: TitleTwoProps) => {
  const navigete = useNavigate();

  return (
    <Container>
      <Box observer={observer}>
        <p>CozyState는 테마 속에서,</p>
        <p>시각적, 청각적인 미디어를 통해</p>
        <p>사용자에게 즐거운 경험을 드립니다.</p>
      </Box>
      <Box2 observer={observer} onClick={() => navigete('/theme')}>
        <SlideImg />
      </Box2>
      <MoveNextPage currentPage={2} />
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
  color: white;
  background-color: black;
  @media (min-width: 300px) {
    justify-content: center;
    flex-direction: column;
  }
  @media (min-width: 768px) {
    justify-content: center;
    flex-direction: column;
  }
  @media (min-width: 1024px) {
    justify-content: space-around;
    flex-direction: row;
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
    font-size: 1.5rem;
    align-items: center;
  }
  @media (min-width: 768px) {
    font-size: 2rem;
    align-items: center;
  }
  @media (min-width: 1024px) {
    font-size: 2rem;
    align-items: flex-start;
  }
`;

const Box2 = styled.div<{ observer: boolean }>`
  opacity: 0;
  cursor: pointer;

  animation: ${({ observer }) => (observer ? slideInAnimation : null)} 1s 0.8s
    forwards;
  transition: height 0.3s, width 0.3s, margin 0.3s;

  @media (min-width: 300px) {
    width: 300px;
    height: 300px;
  }
  @media (min-width: 500px) {
    width: 400px;
    height: 400px;
  }
  @media (min-width: 768px) {
    width: 768px;
    height: 30vh;
    margin: 10vh 0;
    &:hover {
      width: 768px;
      height: 50vh;
      margin: 0;
    }
  }
  @media (min-width: 1024px) {
    width: 50vw;
    height: 30vh;
    &:hover {
      width: 50vw;
      height: 70vh;
    }
  }
`;
