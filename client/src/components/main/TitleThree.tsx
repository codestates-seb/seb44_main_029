import styled, { keyframes } from 'styled-components';

const TitleThree = ({ observer }: { observer: boolean }) => {
  return (
    <Container>
      <Box observer={observer}>
        <img src="https://i.pinimg.com/originals/f2/95/8a/f2958a889d9a74c01d645dbc0d8bedbd.gif" />
        <img src="https://i.pinimg.com/originals/10/ed/f0/10edf0bc3280b426487a392526789865.gif" />
        <img src="https://i.pinimg.com/originals/ac/4e/59/ac4e597e0f986b025f16b0a904b82dc8.gif" />
      </Box>
      <Box2 observer={observer}>
        <p>그림이 마음에 드셨나요?</p>
        <Column>
          <p>좋아요</p>
          <p>버튼을 눌러서,</p>
        </Column>
        <p>당신만의 리스트를 만들어보세요.</p>
      </Box2>
    </Container>
  );
};

export default TitleThree;
//페이드 아웃 애니메이션
const fadeInAnimation = keyframes`
  0% {
    color: blue;
    opacity: 0;
  }
  50% {
    opacity: 1;
    color: blue;
    text-shadow: 0px 0px white;
  }

  70%{
    color: white;
    text-shadow: 10px 10px blue;
  }

  80%{
    color: white;
    text-shadow: 10px 10px blue;
  }

  100%{
    color: white;
    text-shadow: none;
  }
`;
const slideInAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOutAnimation = keyframes`
  100% {
    opacity: 0;
  }
`;
const slideOutAnimation2 = keyframes`
  100% {
    opacity: 1;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 1);
  @media (min-width: 768px) {
  }

  @media (min-width: 1024px) {
  }
`;
const Box = styled.div<{ observer: boolean }>`
  display: flex;
  height: 100%;
  opacity: 0;
  color: white;
  animation: ${({ observer }) =>
      observer ? slideInAnimation : slideOutAnimation}
    1s 0.3s forwards;
  > img {
    height: 100%;
    width: 20vw;
    object-fit: cover;
  }

  @media (min-width: 300px) {
    font-size: 2rem;
  }
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Box2 = styled.div<{ observer: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  opacity: 0;
  flex-grow: 1;
  animation: ${({ observer }) =>
      observer ? slideOutAnimation2 : slideOutAnimation}
    1s 1s forwards;
  > p {
    margin: 0;
    font-weight: bold;
  }

  @media (min-width: 300px) {
    font-size: 2rem;
  }
  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;
const Column = styled.div`
  font-weight: bold;
  display: flex;
  > p {
    margin: 0;
  }
  > .like {
    margin: 0;
    animation: ${fadeInAnimation} 5s ease-in-out;
  }
`;
