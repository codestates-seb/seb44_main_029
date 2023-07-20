import styled from 'styled-components';
import Card from './Card';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GetLikedContents } from '../../../api/api';
import IconAirplane from '../../../assets/icon/icon_airplane.png';
import { useNavigate } from 'react-router';

const LikeList = () => {
  const navigate = useNavigate();
  const handleImgClick = () => {
    navigate('/theme');
  };

  const size = 8;
  const [page, setPage] = useState(1);

  // page 값이 변경되면 업데이트된 page 값으로 쿼리가 다시 실행되어 다음 또는 이전 페이지에 대한 데이터를 가져온다.
  // size는 고정되어 있므므로 쿼리 키의 일부가 아니어야 함.
  const { data } = useQuery(['likedContents', page], () =>
    GetLikedContents(page, size)
  );

  console.log('좋아요 리스트 데이터: ', data);

  // const { data, refetch } = useQuery(['LikedContents'], GetLikedContents, {
  //   enabled: false,
  // });

  // data에서 data, pageInfo 뽑아냄
  const itemInfo = data?.data;
  const pageInfo = data?.pageInfo;

  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = pageInfo?.size || 0;

  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const slicedCards = itemInfo?.slice(startIndex, endIndex) || [];

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // useEffect(() => {
  //   refetch();
  // }, [refetch]);

  return (
    <Container>
      <Title>🍔 Like List</Title>

      {itemInfo && itemInfo.length > 0 ? (
        <List>
          {itemInfo.map((card, index) => (
            <Card
              key={index}
              image={card.contentUri}
              // themeId={card.themeId}
              themeTitle={card.themeTitle}
              contentId={card.contentId}
              contentTitle={card.contentTitle}
              liked={card.liked}
            />
          ))}
        </List>
      ) : (
        <NoLikedImages>
          <p>현재 좋아요 버튼을 누른 이미지가 없습니다.</p>
          <p>
            우선, 테마를 선택하러 가볼까요?{' '}
            <ImgDiv>
              <Img
                src={IconAirplane}
                alt="Airplane"
                onClick={handleImgClick}
              ></Img>
            </ImgDiv>
          </p>
        </NoLikedImages>
      )}
      <Pagination>
        <Button
          onClick={handlePrevPage}
          disabled={pageInfo?.page === 1 || itemInfo?.length === 0}
        >
          이전
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={
            pageInfo?.totalPages === undefined ||
            pageInfo.totalPages >= (itemInfo?.length || 0) ||
            itemInfo?.length === 0 ||
            (itemInfo?.length || 0) < 8 ||
            page === pageInfo.totalPages
          }
        >
          다음
        </Button>
      </Pagination>
    </Container>
  );
};

export default LikeList;

const Container = styled.div`
  width: 100%;
  padding: 1.5rem;
  box-sizing: border-box;
`;

const Title = styled.div`
  width: 100%;
  font-size: 24px;
  border-radius: 1rem;
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
  border-radius: 1rem;

  // 모바일 디바이스
  @media screen and (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }

  // PC 및 큰 디바이스
  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const NoLikedImages = styled.div`
  color: white;
  text-align: center;
  > p {
    font-size: 150%;
  }
`;

const ImgDiv = styled.div`
  width: 100%;
  box-sizing: border-box;
`;
const Img = styled.img`
  width: 10%;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    scale: 1.2;
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
