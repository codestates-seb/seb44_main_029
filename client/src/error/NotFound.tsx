import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Layout>
      <Container>
        <h1>404 Not Found</h1>
        <h3>페이지를 찾을 수 없습니다.</h3>
        <p>
          페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다. <br />
          입력하신 주소가 정확한지 다시 한 번 확인해주세요.
        </p>
        <MainPageMoveLink to={`/`}>메인 화면</MainPageMoveLink>
      </Container>
    </Layout>
  );
};

export default NotFound;

const Layout = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  color: white;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.6), rgb(0, 0, 0, 1));
`;

const Container = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;

  > h3 {
    margin: 0;
  }
`;

const MainPageMoveLink = styled(Link)`
  width: 6rem;
  height: 2rem;
  border-radius: 0.3rem;
  text-decoration: none;
  color: rgba(255, 255, 255, 1);

  background-color: rgba(50, 50, 50, 0.8);
  box-shadow: 1px 1px 0px 2px #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgb(70, 70, 70);
  }
`;
