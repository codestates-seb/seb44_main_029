import React, { useState } from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  isActive: boolean;
}

const ItemListHeader = () => {
  const [showLikedOnly, setShowLikedOnly] = useState<boolean>(false);

  const handleLikeButtonClick = (): void => {
    setShowLikedOnly(!showLikedOnly);
  };

  return (
    <Container>
      <ListFilterDiv>
        <h3 className="item-list-title">Item List</h3>
        <LikeFilterButton
          type="button"
          isActive={showLikedOnly}
          onClick={handleLikeButtonClick}
        >
          좋아요 <br />
          {showLikedOnly ? '❤️' : '🤍'}
        </LikeFilterButton>
      </ListFilterDiv>
    </Container>
  );
};

export default ItemListHeader;

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const ListFilterDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.05);

  .item-list-title {
    margin: 1rem 3rem;
    color: rgba(255, 255, 255, 1);
  }
`;

const LikeFilterButton = styled.button<ButtonProps>`
  width: 3rem;
  height: 1.5rem;
  margin-right: 3rem;
  transition: 0.3s;
  border-radius: 0.4rem;
  background-color: transparent;
  color: rgba(255, 255, 255, 1);
  font-size: 0.6rem;
  letter-spacing: 1px;
  line-height: 14.5px;
  /* border: 2px solid rgba(255, 255, 255, 1);
  box-shadow: 0 0 0.2rem 0.1rem rgba(255, 255, 255, 1); */

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  ${(props) =>
    props.isActive
      ? css`
          border: 2px solid rgba(255, 0, 0, 1);
          box-shadow: 0 0 0.2rem 0.1rem rgba(255, 0, 0, 1);
        `
      : css`
          border: 2px solid rgba(255, 255, 255, 1);
          box-shadow: 0 0 0.2rem 0.1rem rgba(255, 255, 255, 1);
        `}
`;
