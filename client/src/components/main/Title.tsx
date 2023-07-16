import styled, { keyframes } from 'styled-components';

const Title = () => {
  return (
    <Container>
      <TitleDiv>
        <p>안정감과 편안함을 제공하는</p>
        <Column>
          <p>미디어 서비스 </p>
          <p className="fadeIn">Cozy State</p>
        </Column>
      </TitleDiv>
    </Container>
  );
};

export default Title;

//페이드 아웃 애니메이션
const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
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
  margin-bottom: 30vh;
  @media (min-width: 768px) {
  }

  @media (min-width: 1024px) {
  }
`;
const FirstDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SecondDiv = styled.div`
  font-size: 2rem;
  color: white;
  margin-top: 2rem;
  > p {
    margin: 0;
    @media (min-width: 768px) {
      font-size: 1.5rem;
    }

    @media (min-width: 1024px) {
      font-size: 2rem;
    }
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
    animation: ${fadeInAnimation} 2s ease-in-out;
  }
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
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

const Img = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  margin-bottom: 2rem;

  @media (min-width: 1024px) {
    margin-right: 2rem;
  }
`;
