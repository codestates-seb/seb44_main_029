import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { UpdateLike } from '../../../api/api';
import { ItemInfo } from '../../../types/types';

type ItemProps = Omit<ItemInfo, 'themeTitle' | 'howManyLiked' | 'contentTitle'>;

interface LikeButtonProps {
  isActive: boolean;
}

const DetailedItem = ({ contentId, liked, contentUri }: ItemProps) => {
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

  return (
    <Container>
      <ItemContainerDiv>
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
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemImgDiv = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  width: 57%;

  > img {
    display: flex;
    width: 100%;
    height: 100%;
    object-fit: cover;
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
