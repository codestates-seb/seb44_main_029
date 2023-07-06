import styled from 'styled-components';
import mainIcon from '../../assets/images/mainIcon.png';
const Title = () => {
  return (
    <Container>
      <FirstDiv>
        <TitleDiv>CozyStates</TitleDiv>
        <Img src={mainIcon} />
      </FirstDiv>

      <SecondDiv>
        <p>시각적 안정감과 음성적 편안함을 제공하는</p>
        <p>무료 동영상 스트리밍 서비스</p>
      </SecondDiv>
    </Container>
  );
};

export default Title;

const Container = styled.div`
  margin: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    margin: 6rem 2rem;
  }

  @media (min-width: 1024px) {
    margin: 10rem 0 0 8rem;
  }
`;
const FirstDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
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

const TitleDiv = styled.div`
  color: white;
  margin-left: 8rem;
  margin-bottom: 1rem;
  font-family: 'Lalezar', cursive;
  font-weight: bold;
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
