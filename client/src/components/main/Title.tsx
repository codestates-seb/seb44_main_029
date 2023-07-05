import styled from 'styled-components';
import mainIcon from '../../assets/images/mainIcon.png';
const Title = () => {
  return (
    <Container>
      <FirstDiv>
        <TitleDiv>Cozy States</TitleDiv>
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
  margin: 400px 100px 100px 200px;
`;
const FirstDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SecondDiv = styled.div`
  font-size: 30px;
  color: white;
  > p {
    margin: 0;
  }
`;

const TitleDiv = styled.div`
  font-size: 65px;
  color: white;
`;

const Img = styled.img`
  width: 300px;
  height: 300px;
`;
