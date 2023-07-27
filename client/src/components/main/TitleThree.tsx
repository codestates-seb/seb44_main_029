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
        <Column observer={observer}>
          <p className="like">❤️</p>
          <p>좋아요 버튼을 눌러서,</p>
        </Column>
        <p>당신만의 리스트를 만들어보세요.</p>
      </Box2>
    </Container>
  );
};

export default TitleThree;
//페이드 아웃 애니메이션
const fadeInAnimation = keyframes`
  20% {
    color: red;
    background-color: white;
    box-shadow: 3px 3px 1px 1px #a0a0a0;
    opacity: 1;
  }
  50%{
    box-shadow: 3px 3px 1px 1px #a0a0a0;
    transform: translateY(0px);
    transform: translateX(0px);
  }
  60% {
    transform: translateY(3px);
    transform: translateX(3px);
    box-shadow: 0px 0px 1px 1px #a0a0a0;
  }

  65%{
    transform: translateY(0px);
    transform: translateX(0px);
    box-shadow: 3px 3px 1px 1px #a0a0a0;
  }

  100%{
    color: red;
    background-color: white;
    opacity: 1;
    transform: translateY(3px);
    transform: translateX(3px);
    box-shadow: 0px 0px 1px 1px #a0a0a0;

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
  @media (min-width: 300px) {
    flex-direction: column;
  }
  @media (min-width: 768px) {
    flex-direction: column;
  }
  @media (min-width: 1024px) {
    flex-direction: column;
  }
`;
const Box = styled.div<{ observer: boolean }>`
  position: absolute;
  display: flex;
  height: 100%;
  opacity: 0;
  color: white;
  left: 0;
  animation: ${({ observer }) =>
      observer ? slideInAnimation : slideOutAnimation}
    1s 0.3s forwards;
  > img {
    height: 100%;
    width: 20vw;
    object-fit: cover;
    @media (min-width: 300px) {
      height: 70%;
      width: 33vw;
    }
    @media (min-width: 768px) {
      height: 100%;
      width: 20vw;
    }
    @media (min-width: 1024px) {
      height: 100%;
      width: 20vw;
    }
  }
`;

const Box2 = styled.div<{ observer: boolean }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  opacity: 0;
  animation: ${({ observer }) =>
      observer ? slideOutAnimation2 : slideOutAnimation}
    1s 1s forwards;
  > p {
    margin: 0;
    font-weight: bold;
    @media (min-width: 300px) {
      font-size: 1.5rem;
    }
    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
    @media (min-width: 1024px) {
      font-size: 1.8rem;
    }
  }
  @media (min-width: 300px) {
    align-items: center;
    bottom: -195%;
  }
  @media (min-width: 768px) {
    align-items: end;
    right: 0;
    bottom: -160%;
  }
  @media (min-width: 1024px) {
    align-items: end;
    right: 1%;
    bottom: -160%;
  }
`;
const Column = styled.div<{ observer: boolean }>`
  font-weight: bold;
  display: flex;
  @media (min-width: 300px) {
    font-size: 1.5rem;
    margin: 3px 0;
  }
  @media (min-width: 768px) {
    font-size: 1.5rem;
    margin: 10px 0;
  }
  @media (min-width: 1024px) {
    font-size: 1.8rem;
    margin: 30px 0;
  }
  > p {
    margin: 0;
  }
  > .like {
    opacity: 0;
    padding: 0 5px;
    margin: 0 5px;
    border-radius: 10px;
    box-shadow: 3px 3px 1px 1px #a0a0a0;
    animation: ${({ observer }) =>
        observer ? fadeInAnimation : slideOutAnimation}
      3s 2s forwards;
    transition: box-shadow 2s;
  }
`;
