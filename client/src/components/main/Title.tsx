import styled, { keyframes } from 'styled-components';
import { TbCarouselHorizontal, TbLogin } from 'react-icons/tb';

const Title = () => {
  return (
    <Container>
      <TitleDiv>
        <p>편안함을 제공하는</p>
        <Column>
          <p>미디어 서비스 </p>
          <p className="fadeIn">Cozy State</p>
        </Column>
        <BtnColumnDiv>
          <button>
            <TbLogin />
            로그인
          </button>
          <button>
            <TbCarouselHorizontal />
            테마 둘러보기
          </button>
        </BtnColumnDiv>
      </TitleDiv>
    </Container>
  );
};

export default Title;

//페이드 아웃 애니메이션
const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  70% {
    color: white;
  }

  80%{
    color: #2b79ff
  }

  100%{
    color: white;
  }
`;
const fadeInAnimation2 = keyframes`
  0% {
    opacity: 0;
  }
  50%{
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
  }

  @media (min-width: 1024px) {
  }
`;

const Column = styled.div`
  display: flex;
  > p {
    margin: 0;
    margin-right: 30px;
  }
  > .fadeIn {
    margin: 0;
    animation: ${fadeInAnimation} 5s ease-in-out;
  }
`;

const BtnColumnDiv = styled.div`
  display: flex;
  > button {
    width: 140px;
    height: 40px;
    border-radius: 5px;
    border: none;
    background-color: rgba(50, 50, 50, 0.8);
    color: white;
    box-shadow: 1px 1px 3px 2px #000000;
    margin: 50px 10px 0 10px;
    animation: ${fadeInAnimation2} 2s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-weight: bold;
  }
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  > p {
    margin: 0;
  }
  @media (min-width: 300px) {
    font-size: 2rem;
  }
  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;
