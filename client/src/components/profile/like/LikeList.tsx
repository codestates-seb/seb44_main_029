import styled from 'styled-components';
import Card from './Card';
import { useState } from 'react';

interface LikeListProps {
  cards: {
    image: string;
    themeName: string;
    videoName: string;
  }[]; // Replace 'any' with the actual type of your card data
}

const LikeList = ({ cards }: LikeListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedCards = cards.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <Container>
      <Title>🍔 Like List</Title>

      <List>
        {slicedCards.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            themeName={card.themeName}
            videoName={card.videoName}
          />
        ))}
      </List>
      <Pagination>
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          이전
        </Button>
        <Button onClick={handleNextPage} disabled={endIndex >= cards.length}>
          다음
        </Button>
      </Pagination>
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

  // 모바일 디바이스
  @media screen and (min-width: 576px) {
    width: 70%;
  }

  // PC 및 큰 디바이스
  @media screen and (min-width: 1024px) {
    width: 90%;
  }
`;

const Title = styled.div`
  width: 764px;
  height: 50px;
  color: white;
  font-size: 24px;
  background-color: rgba(0, 0, 0, 0.3);
  margin-bottom: 9px;

  // 모바일 디바이스
  @media screen and (min-width: 576px) {
    width: 70%;
  }

  // PC 및 큰 디바이스
  @media screen and (min-width: 1024px) {
    width: 90%;
  }
`;
const List = styled.div`
  /* width: 724px;
  height: 400px;
  background-color: rgba(0, 0, 0, 0.3);
  margin-top: 9px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-evenly; */
  background-color: rgba(0, 0, 0, 0.3);
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  grid-gap: 1rem;

  // 모바일 디바이스
  @media screen and (min-width: 576px) {
    grid-template-columns: repeat(4, 1fr);
    width: 70%;
  }

  // PC 및 큰 디바이스
  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
    width: 90%;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 9px;
`;

const Button = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  border: 1px solid white;
  border-radius: 12px;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
