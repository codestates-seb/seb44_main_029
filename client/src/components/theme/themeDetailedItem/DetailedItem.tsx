import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { UpdateLike } from '../../../api/api';
import { DetailedItemProps } from '../../../types/types';
import previousArrowSvg from '../../../assets/icon/icon_previous_arrow.svg';
import nextArrowSvg from '../../../assets/icon/icon_next_arrow.svg';

const DetailedItem = ({
  contentId,
  liked,
  themeId,
  item,
  themeContentIds,
  currentItemIndex,
  firstItemContentId,
  lastElementContentId,
}: DetailedItemProps) => {
  const [likedItem, setLikedItem] = useState<boolean>(liked); // 좋아요 상태 관리를 위한 상태
  const queryClient = useQueryClient();

  // 좋아요 업데이트를 위한 useMutation 정의
  const handleUpdateLikeMutation = useMutation(UpdateLike, {
    onSuccess: () => {
      setLikedItem((likedItem) => !likedItem); // 좋아요 상태를 업데이트
      queryClient.invalidateQueries(['items']); // 'items' 쿼리를 무효화하여 캐싱된 데이터를 서버의 최신 데이터로 갱신
    },
    onError: (error) => {
      console.log(`onError: ${error}`);
    },
  });

  // 좋아요 버튼이 클릭되었을 때 실제 처리를 담당하는 함수
  const handleLikeButtonClick = async () => {
    try {
      await handleUpdateLikeMutation.mutateAsync(contentId);
    } catch (error) {
      console.log(error);
    }
  };

  // 이전 및 다음 버튼의 이동 위치를 결정하는 함수
  const getContentId = (shift: number) => {
    const index = currentItemIndex + shift;
    return themeContentIds[index] || null;
  };

  // 이전 및 다음 contentId 값 할당
  const previousContentId = getContentId(-1) || lastElementContentId;
  const nextContentId = getContentId(+1) || firstItemContentId;

  return (
    <Container>
      <ItemContainerDiv>
        <MoveToPreviousDiv to={`/theme/${themeId}/${previousContentId}`}>
          <img src={previousArrowSvg} alt="Previous Arrow" />
        </MoveToPreviousDiv>
        <ItemImgDiv>
          <img src={item.contentUri} alt="content" />
        </ItemImgDiv>
        <OverlayControlDiv>
          <LikeButton
            type="button"
            isActive={likedItem}
            onClick={handleLikeButtonClick}
          >
            🤍
          </LikeButton>
        </OverlayControlDiv>
        <MoveToNextDiv to={`/theme/${themeId}/${nextContentId}`}>
          <img src={nextArrowSvg} alt="Next Arrow" />
        </MoveToNextDiv>
      </ItemContainerDiv>
    </Container>
  );
};

export default DetailedItem;

const Container = styled.div`
  width: 100%;
  border-radius: 0 0 0.33rem 0.33rem;
  box-sizing: border-box;
  overflow: auto;
`;

const OverlayControlDiv = styled.div`
  box-sizing: border-box;
  display: flex;
  position: absolute;
  opacity: 1;
  bottom: 3.5rem;
  width: 100%;
  padding: 0.5rem;
  pointer-events: none;
  justify-content: center;
`;

const ItemContainerDiv = styled.div`
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemImgDiv = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding: 3.5rem 0;
  display: flex;
  justify-content: center;

  > img {
    display: flex;
    object-fit: contain;
  }
`;

const LikeButton = styled.button<{ isActive: boolean }>`
  box-sizing: border-box;
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  pointer-events: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.15s;
  border: ${(props) =>
    props.isActive
      ? `2px solid rgba(255, 255, 255, 1)`
      : `2px solid rgba(255, 255, 255, 0.5)`};
  background-color: ${(props) =>
    props.isActive ? `rgba(0, 170, 0, 0.9)` : `transparent`};

  &:hover {
    border: 2px solid rgba(255, 255, 255, 1);
  }
`;

const MoveToDiv = css`
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  position: absolute;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

const MoveToPreviousDiv = styled(Link)`
  ${MoveToDiv}
  left: 0;
`;

const MoveToNextDiv = styled(Link)`
  ${MoveToDiv}
  right: 0;
`;
