import styled from 'styled-components';
import Card from './Card';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GetLikedContents } from '../../../api/api';
import IconAirplane from '../../../assets/icon/icon_airplane.png';
import { useNavigate } from 'react-router';
import { IThemeItemProps } from '../../../types/types';

const LikeList = () => {
  // 좋아요 리스트가 없을 경우 테마 리스트 페이지로 이동
  const navigate = useNavigate();
  const handleImgClick = () => {
    navigate('/theme');
  };

  const size = 8;
  const [page, setPage] = useState(1);

  // page 값이 변경되면 업데이트된 page 값으로 쿼리가 다시 실행되어 다음 또는 이전 페이지에 대한 데이터를 가져온다.
  // size는 고정되어 있므므로 쿼리 키의 일부가 아니어야 함.
  const { data } = useQuery<IThemeItemProps>(['likedContents', page], () =>
    GetLikedContents(page, size)
  );

  // data에서 data, pageInfo 뽑아냄
  const itemInfo = data?.data;
  const pageInfo = data?.pageInfo;

  // 이전 페이지
  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  // 다음 페이지
  const handleNextPage = () => {
    if (pageInfo?.totalPages && page < pageInfo.totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // 좋아요 이미지를 삭제 처리
  const handleItemDelete = () => {
    // 삭제 후 현재 페이지가 비어있는지 확인
    if (itemInfo && itemInfo.length === 1) {
      // 첫 번째 페이지에 있다면 첫 번째 페이지 그대로
      if (page === 1) return;

      // 첫 번째 페이지가 아니라면, 이전 페이지로 돌아가기.
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <Container>
      <Title>❤️ Like List</Title>

      {itemInfo && itemInfo.length > 0 ? (
        <List>
          {itemInfo.map((card, index) => (
            <Card
              key={index}
              image={card.contentUri}
              themeId={card.themeId}
              themeTitle={card.themeTitle}
              contentId={card.contentId}
              liked={card.liked}
              handleItemDelete={handleItemDelete}
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
  border-radius: 1rem;
  color: white;
  padding: 1.5rem;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.3);
  margin-bottom: 1rem;

  @media (min-width: 300px) {
    font-size: 100%;
  }
  @media (min-width: 768px) {
    font-size: 120%;
  }
  @media (min-width: 1024px) {
    font-size: 150%;
  }
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
    @media (min-width: 300px) {
      font-size: 50%;
      margin-bottom: 0;
    }
    @media (min-width: 768px) {
      font-size: 100%;
    }
    @media (min-width: 1024px) {
      font-size: 150%;
    }
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
