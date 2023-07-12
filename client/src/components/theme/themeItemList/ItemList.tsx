import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { ItemType } from '../../../pages/ThemeItemList';

interface ItemListProps extends ItemType {
  themeId: number;
}

interface LikeButtonProps {
  isActive: boolean;
}

const ItemList = ({
  contentId,
  themeTitle,
  howManyLiked,
  contentTitle,
  contentUri,
  themeId,
}: ItemListProps) => {
  const [plusLikeButton, setPlusLikeButton] = useState<boolean>(false);

  const handleLikeButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setPlusLikeButton(!plusLikeButton);
  };

  return (
    <Container>
      <ItemLink to={`/theme/${themeId}/${contentId}`}>
        <img src={contentUri} alt="item-image"></img>
      </ItemLink>
      <OverlayControlDiv>
        <LikeButton
          type="button"
          isActive={plusLikeButton}
          onClick={handleLikeButtonClick}
        >
          🤍
        </LikeButton>
      </OverlayControlDiv>
    </Container>
  );
};

export default ItemList;

const OverlayControlDiv = styled.div`
  box-sizing: border-box;
  display: flex;
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.5rem;
  pointer-events: none;
`;

const Container = styled.div`
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  max-height: 100%;

  &:hover > ${OverlayControlDiv} {
    background: linear-gradient(
      180deg,
      rgba(25, 27, 38, 0.56),
      rgba(25, 27, 38, 0)
    );
    transition: all 0.25s;
    opacity: 1;
  }
`;

const ItemLink = styled(Link)`
  box-sizing: border-box;
  cursor: pointer;
  display: flex;

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
