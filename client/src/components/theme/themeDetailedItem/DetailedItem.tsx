import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { UpdateLike } from '../../../api/api';
import { ItemInfo } from '../../../types/types';
import { Link } from 'react-router-dom';
import previousArrowSvg from '../../../assets/icon/icon_previous_arrow.svg';
import nextArrowSvg from '../../../assets/icon/icon_next_arrow.svg';

interface ItemProps
  extends Omit<ItemInfo, 'themeTitle' | 'howManyLiked' | 'contentTitle'> {
  themeId: number;
  totalElementsNum: number;
}

interface LikeButtonProps {
  isActive: boolean;
}

const DetailedItem = ({
  contentId,
  liked,
  contentUri,
  themeId,
  totalElementsNum,
}: ItemProps) => {
  const [likedItem, setLikedItem] = useState<boolean>(liked);
  const queryClient = useQueryClient();

  // 좋아요 업데이트를 위한 useMutation 정의
  const handleUpdateLikeMutation = useMutation(UpdateLike, {
    onSuccess: () => {
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
      setLikedItem((likedItem) => !likedItem); // 좋아요 상태를 업데이트
    } catch (error) {
      console.log(error);
    }
  };

  const handleMoveButtonClick = () => {
    queryClient.invalidateQueries(['items']);
  };

  return (
    <Container>
      <ItemContainerDiv>
        <MoveToPreviousDiv
          to={`/theme/${themeId}/${contentId - 1}`}
          disabled={contentId === 1}
          onClick={handleMoveButtonClick}
        >
          <img src={previousArrowSvg}></img>
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
          to={`/theme/${themeId}/${contentId + 1}`}
          disabled={contentId === totalElementsNum}
          onClick={handleMoveButtonClick}
        >
          <img src={nextArrowSvg}></img>
        </MoveToNextDiv>
      </ItemContainerDiv>
    </Container>
  );
};

export default DetailedItem;

const Container = styled.div`
  width: 100%;
  border-radius: 0 0 0.33rem 0.33rem;
  padding: 1.5rem;
  box-sizing: border-box;
  overflow: auto;
`;

const OverlayControlDiv = styled.div`
  box-sizing: border-box;
  display: flex;
  position: absolute;
  opacity: 1;
  bottom: 0;
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
  display: flex;
  width: 100%;

  > img {
    display: flex;
    width: 100vw;
    height: 77vh;
    object-fit: contain;
    border-radius: 0.5rem;
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

const MoveToPreviousDiv = styled(Link)<{ disabled: boolean }>`
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  position: absolute;
  left: 0;

  &:hover {
    opacity: 0.6;
  }

  /* contentId가 1일 때, disabled 적용 */
  ${(props) =>
    props.disabled &&
    css`
      pointer-events: none;
      opacity: 0.6;
      cursor: default;
    `}
`;

const MoveToNextDiv = styled(Link)<{ disabled: boolean }>`
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  position: absolute;
  right: 0;

  &:hover {
    opacity: 0.6;
  }

  /* contentId가 totalElements와 같을 때, disabled 적용 */
  ${(props) =>
    props.disabled &&
    css`
      pointer-events: none;
      opacity: 0.6;
      cursor: default;
    `}
`;
