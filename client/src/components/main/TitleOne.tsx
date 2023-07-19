import styled, { keyframes } from 'styled-components';
import { TbCarouselHorizontal, TbLogin } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

const TitleOne = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <TitleDiv>
        <p>편안함을 제공하는</p>
        <Column>
          <p>미디어 서비스 </p>
          <p className="fadeIn">CozyState</p>
        </Column>
        <BtnColumnDiv>
          <button onClick={() => navigate('/theme')}>
            <TbLogin />
            <p>로그인</p>
          </button>
          <button onClick={() => navigate('/theme')}>
            <TbCarouselHorizontal />
            <p>테마 둘러보기</p>
          </button>
        </BtnColumnDiv>
      </TitleDiv>
    </Container>
  );
};

export default TitleOne;

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
const fadeInAnimation2 = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.9);
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
    border: none;
    background-color: rgba(50, 50, 50, 0.8);
    color: white;
    box-shadow: 1px 1px 0px 2px #000000;
    margin: 50px 10px 0 10px;
    opacity: 0;
    animation: ${fadeInAnimation2} 1s ease-in-out 1.5s forwards;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    transition: background-color 0.2s ease-in-out;
    @media (min-width: 300px) {
      font-size: 0.5rem;
      width: 80px;
      height: 30px;
      border-radius: 5px;
    }
    @media (min-width: 768px) {
      font-size: 1rem;
      width: 150px;
      height: 40px;
      border-radius: 10px;
    }
  }
  > button:hover {
    background-color: rgb(70, 70, 70);
  }
`;
