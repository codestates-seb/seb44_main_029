import React from 'react';
import styled, { css } from 'styled-components';

interface LikeButtonProps {
  isActive: boolean;
}

interface ItemListHeaderProps {
  handleFilterlikeButton: () => void;
  showLikedOnly: boolean;
}

const ItemListHeader = ({
  handleFilterlikeButton,
  showLikedOnly,
}: ItemListHeaderProps) => {
  return (
    <Container>
      <ListFilterDiv>
        <h3 className="item-list-title">Item List</h3>
        <LikeFilterButton
          type="button"
          isActive={showLikedOnly}
          onClick={handleFilterlikeButton}
        >
          Like <br />
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
    margin: 0.8rem 3rem;
    color: rgba(255, 255, 255, 1);
  }
`;

const LikeFilterButton = styled.button<LikeButtonProps>`
  width: 2.7rem;
  height: 1.4rem;
  margin-right: 3rem;
  transition: 0.3s;
  border-radius: 0.4rem;
  background-color: transparent;
  font-size: 0.6rem;
  line-height: 13px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  ${(props) =>
    props.isActive
      ? css`
          border: 2px solid rgba(255, 0, 0, 1);
          box-shadow: 0 0 0.2rem 0.1rem rgba(255, 0, 0, 1);
          color: rgba(255, 0, 0, 1);
        `
      : css`
          border: 2px solid rgba(255, 255, 255, 1);
          box-shadow: 0 0 0.2rem 0.1rem rgba(255, 255, 255, 1);
          color: rgba(255, 255, 255, 1);
        `}
`;
