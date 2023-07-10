import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ThemeHeader from '../components/theme/themeItemList/ThemeHeader';
import ItemListHeader from '../components/theme/themeItemList/ItemListHeader';
import ItemList from '../components/theme/themeItemList/ItemList';
import { dummy } from '../data/dummy';

export interface FetchItemType {
  contentId: number;
  themeTitle: string;
  howManyLiked: number;
  contentTitle: string;
  contentUri: string;
}

const ThemeItemList = () => {
  const [items, setItems] = useState<FetchItemType[]>([]);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    setItems(dummy);
  }, []);

  useEffect(() => {
    function updateMaxHeight() {
      const screenHeight = window.screen.height;
      setMaxHeight(screenHeight * 0.5);
    }

    window.addEventListener('resize', updateMaxHeight);
    updateMaxHeight();

    return () => {
      window.removeEventListener('resize', updateMaxHeight);
    };
  }, []);

  return (
    <Layout>
      <ContentContainer>
        <ThemeHeader />
        <ItemListHeader />
        <ItemListContainerDiv style={{ maxHeight: `${maxHeight}px` }}>
          <ItemGridDiv>
            {items.map((item) => (
              <ItemList key={item.contentId} {...item} />
            ))}
          </ItemGridDiv>
        </ItemListContainerDiv>
      </ContentContainer>
    </Layout>
  );
};

export default ThemeItemList;

const Layout = styled.div`
  box-sizing: border-box;
  max-width: 100%;
  width: 100%;
  padding: 5rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('https://i.pinimg.com/originals/48/37/23/483723e0f94bd43ef7b9716aa0d3ce86.gif');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    filter: blur(5px);
    z-index: -1;
    transform: scale(1.02);
  }
`;

const ContentContainer = styled.div`
  box-sizing: border-box;
  max-width: 1076px;
  width: 100%;
  flex-direction: column;
  box-shadow: 0 0 0.2rem 0.1rem rgba(255, 255, 255, 0.7);
  border-radius: 0.5rem;
  background-color: rgba(0, 0, 0, 0.9);
`;

const ItemListContainerDiv = styled.div`
  width: 100%;
  border-radius: 0 0 0.33rem 0.33rem;
  color: white;
  padding: 1.5rem;
  box-sizing: border-box;
  overflow: auto;
  /* max-height: 600px; */
`;

const ItemGridDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 1rem;

  // 모바일 디바이스
  @media screen and (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }

  // PC 및 큰 디바이스
  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
