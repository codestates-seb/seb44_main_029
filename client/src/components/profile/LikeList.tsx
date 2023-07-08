import styled from 'styled-components';
import Card from './Card';
const LikeList = () => {
  return (
    <Container>
      <Title>🍔 Like List</Title>
      <List>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </List>
    </Container>
  );
};

export default LikeList;

const Container = styled.div`
  width: 824px;
  height: 500px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  margin-top: 15px;
`;

const Title = styled.div`
  width: 724px;
  height: 50px;
  color: white;
  font-size: 24px;
  background-color: rgba(0, 0, 0, 0.3);
  margin-bottom: 9px;
`;

const List = styled.div`
  width: 724px;
  height: 400px;
  background-color: rgba(0, 0, 0, 0.3);
  margin-top: 9px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
