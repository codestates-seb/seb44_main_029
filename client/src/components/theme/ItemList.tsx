import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ItemList = () => {
  return (
    <Container>
      <ItemLink to={`/theme/:themeId/:imageId`}>
        <img src="https://i.pinimg.com/564x/d7/47/74/d74774ce15db8411c5dd0e30155a02f4.jpg"></img>
      </ItemLink>
      <ItemLink to={`/theme/:themeId/:imageId`}>
        <img src="https://i.pinimg.com/564x/d7/47/74/d74774ce15db8411c5dd0e30155a02f4.jpg"></img>
      </ItemLink>
      <ItemLink to={`/theme/:themeId/:imageId`}>
        <img src="https://i.pinimg.com/564x/d7/47/74/d74774ce15db8411c5dd0e30155a02f4.jpg"></img>
      </ItemLink>
      <ItemLink to={`/theme/:themeId/:imageId`}>
        <img src="https://i.pinimg.com/564x/d7/47/74/d74774ce15db8411c5dd0e30155a02f4.jpg"></img>
      </ItemLink>
      <ItemLink to={`/theme/:themeId/:imageId`}>
        <img src="https://i.pinimg.com/564x/d7/47/74/d74774ce15db8411c5dd0e30155a02f4.jpg"></img>
      </ItemLink>
      <ItemLink to={`/theme/:themeId/:imageId`}>
        <img src="https://i.pinimg.com/564x/d7/47/74/d74774ce15db8411c5dd0e30155a02f4.jpg"></img>
      </ItemLink>
      <ItemLink to={`/theme/:themeId/:imageId`}>
        <img src="https://i.pinimg.com/564x/d7/47/74/d74774ce15db8411c5dd0e30155a02f4.jpg"></img>
      </ItemLink>
      <ItemLink to={`/theme/:themeId/:imageId`}>
        <img src="https://i.pinimg.com/564x/d7/47/74/d74774ce15db8411c5dd0e30155a02f4.jpg"></img>
      </ItemLink>
      <ItemLink to={`/theme/:themeId/:imageId`}>
        <img src="https://i.pinimg.com/564x/d7/47/74/d74774ce15db8411c5dd0e30155a02f4.jpg"></img>
      </ItemLink>
      <ItemLink to={`/theme/:themeId/:imageId`}>
        <img src="https://i.pinimg.com/564x/d7/47/74/d74774ce15db8411c5dd0e30155a02f4.jpg"></img>
      </ItemLink>
      <ItemLink to={`/theme/:themeId/:imageId`}>
        <img src="https://i.pinimg.com/564x/d7/47/74/d74774ce15db8411c5dd0e30155a02f4.jpg"></img>
      </ItemLink>
      <ItemLink to={`/theme/:themeId/:imageId`}>
        <img src="https://i.pinimg.com/564x/d7/47/74/d74774ce15db8411c5dd0e30155a02f4.jpg"></img>
      </ItemLink>
    </Container>
  );
};

export default ItemList;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  justify-items: center;
  align-items: center;
  gap: 2rem 1rem;
`;

const ItemLink = styled(Link)`
  cursor: pointer;

  > img {
    width: 16rem;
    height: 16rem;
    border-radius: 0.5rem;
  }
`;
