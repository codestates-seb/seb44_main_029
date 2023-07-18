import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { UpdateLike } from '../../../api/api';
import { IThemeItemProps, ItemInfo } from '../../../types/types';
import previousArrowSvg from '../../../assets/icon/icon_previous_arrow.svg';
import nextArrowSvg from '../../../assets/icon/icon_next_arrow.svg';

interface ItemProps
  extends Omit<ItemInfo, 'themeTitle' | 'howManyLiked' | 'contentTitle'> {
  themeId: number;
  items: IThemeItemProps;
  currentItemIndex: number;
  firstItemContentId: number;
  lastElementContentId: number;
}

interface LikeButtonProps {
  isActive: boolean;
}

const DetailedItem = ({
  contentId,
  liked,
  contentUri,
  themeId,
  items,
  currentItemIndex,
  firstItemContentId,
  lastElementContentId,
}: ItemProps) => {
  const [likedItem, setLikedItem] = useState<boolean>(liked); // 좋아요 상태 관리를 위한 상태
  const queryClient = useQueryClient();

  // 좋아요 업데이트를 위한 useMutation 정의
  const handleUpdateLikeMutation = useMutation(UpdateLike, {
    onSuccess: () => {
      setLikedItem((likedItem) => !likedItem); // 좋아요 상태를 업데이트
      queryClient.invalidateQueries(['items']); // 'items' 쿼리를 무효화하여 데이터를 갱신
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
    return items.data[index]?.contentId || null;
  };

  // 이전 및 다음 contentId 값 할당
  const previousContentId = getContentId(-1);
  const nextContentId = getContentId(+1);

  return (
    <Container>
      <ItemContainerDiv>
        <MoveToPreviousDiv
          to={`/theme/${themeId}/${previousContentId || lastElementContentId}`}
        >
          <img src={previousArrowSvg} alt="Previous Arrow"></img>
        </MoveToPreviousDiv>
        <ItemImgDiv>
          <img src={contentUri} alt="content"></img>
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
        <MoveToNextDiv
          to={`/theme/${themeId}/${nextContentId || firstItemContentId}`}
        >
          <img src={nextArrowSvg} alt="Next Arrow"></img>
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

const LikeButton = styled.button<LikeButtonProps>`
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

  &:hover {
    border: 2px solid rgba(255, 255, 255, 1);
  }

  ${(props) =>
    props.isActive
      ? css`
          border: 2px solid rgba(255, 255, 255, 1);
          background-color: rgba(0, 170, 0, 0.9);
        `
      : css`
          border: 2px solid rgba(255, 255, 255, 0.5);
          background-color: transparent;
        `}
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
