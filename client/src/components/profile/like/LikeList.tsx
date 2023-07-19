import styled from 'styled-components';
import Card from './Card';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GetLikedContents } from '../../../api/api';

interface LikeListProps {
  cards: {
    image: string;
    themeName: string;
    videoName: string;
  }[]; // Replace 'any' with the actual type of your card data
}

const LikeList = ({ cards }: LikeListProps) => {
  const { data, refetch } = useQuery(['LikedContents'], GetLikedContents, {
    enabled: false, // Set initial enabled to false
  });

  const ItemInfo = data?.data;
  const PageInfo = data?.pageInfo;

  console.log('ItemInfo', ItemInfo);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedCards = cards.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    refetch(); // Manually trigger the data fetching when the component mounts
  }, [refetch]);

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
  width: 100%;
  border-radius: 0 0 0.33rem 0.33rem;
  color: white;
  padding: 1.5rem;
  box-sizing: border-box;
`;

const Title = styled.div`
  width: 100%;
  font-size: 24px;
  border-radius: 0 0 0.33rem 0.33rem;
  color: white;
  padding: 1.5rem;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.3);
  margin-bottom: 1rem;
`;

const List = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 1rem;
  grid-template-columns: repeat(1, 1fr);

  // 모바일 디바이스
  @media screen and (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }

  // PC 및 큰 디바이스
  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
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
