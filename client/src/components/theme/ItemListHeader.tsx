import React from 'react';
import styled from 'styled-components';

const ThemeContent = () => {
  return (
    <Container>
      <ListFilterDiv>
        <h3 className="item-list-title">Item List</h3>
        <button type="button">좋아요 🤍</button>
      </ListFilterDiv>
    </Container>
  );
};

export default ThemeContent;

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const ListFilterDiv = styled.div`
  background-color: rgba(0, 0, 0, 0.88);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 1);

  .item-list-title {
    margin: 1rem 2rem;
    color: rgba(255, 255, 255, 1);
  }

  > button {
    width: 3.7rem;
    height: 1.5rem;
    margin-right: 1rem;
    transition: 0.3s;
    border: 2px solid #c8c8c8;
    border-radius: 0.4rem;
    background-color: transparent;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.6rem;

    &:hover {
      background-color: #474747;
    }
  }
`;
