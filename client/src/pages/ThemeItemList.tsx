import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ThemeHeader from '../components/theme/themeItemList/ThemeHeader';
import ItemListHeader from '../components/theme/themeItemList/ItemListHeader';
import ItemList from '../components/theme/themeItemList/ItemList';
import { AxiosError } from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { FetchThemeItemProps } from '../types/types';
import { GetThemeItems } from '../api/api';

const ThemeItemList = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const numericThemeId = parseInt(themeId || '');

  const {
    data: items,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<FetchThemeItemProps, AxiosError>(
    ['items'],
    ({ pageParam = 1 }) =>
      GetThemeItems(parseInt(themeId || ''), pageParam, 20),
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage, allPages) => {
        const { pageInfo } = lastPage;
        if (pageInfo.page < pageInfo.totalPages) {
          return pageInfo.page + 1;
        }
        return false;
      },
    }
  );

  const handleIntersect = async (entry: IntersectionObserverEntry) => {
    // 단순히 isIntersecting을 확인하는 대신
    // 더 많은 데이터를 로드하고 있는지 여부를 확인해야 합니다.
    if (
      entry.isIntersecting &&
      hasNextPage &&
      !(isFetching || isFetchingNextPage)
    ) {
      await fetchNextPage(); // 다음 페이지를 가져옵니다.
    }
  };

  const targetRef = useRef<HTMLDivElement | null>(null);

  useIntersectionObserver({
    target: targetRef,
    onIntersect: handleIntersect,
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
    enabled: !!hasNextPage,
  });

  console.log(items?.pages);

  return (
    <Layout>
      <ContentContainer>
        <ThemeHeader />
        <ItemListHeader />
        <ItemListContainerDiv>
          <ItemGridDiv>
            {items?.pages.flatMap((page) =>
              page.data.map((item) => (
                <ItemList
                  key={item.contentId}
                  contentId={item.contentId}
                  themeTitle={item.themeTitle}
                  howManyLiked={item.howManyLiked}
                  contentTitle={item.contentTitle}
                  contentUri={item.contentUri}
                  themeId={numericThemeId}
                />
              ))
            )}
          </ItemGridDiv>
          <div ref={targetRef} /> {/* 무한 스크롤 로딩 중 일시 중지 */}
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
  overflow: hidden;

  &::before {
    content: '';
    position: fixed;
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
