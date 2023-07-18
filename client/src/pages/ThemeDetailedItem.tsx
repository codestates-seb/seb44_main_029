import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import getBackgroundImage from '../utils/getBackgroundImage';
import { GetThemeItems } from '../api/api';
import { IThemeItemProps } from '../types/types';
import DetailedItem from '../components/theme/themeDetailedItem/DetailedItem';

const ThemeDetailedItem = () => {
  // 현재 선택된 테마 아이디와 contentId를 가져온다.
  const { themeId, contentId } = useParams<{
    themeId: string;
    contentId: string;
  }>();
  const numThemeId = parseInt(themeId || '');
  const numContentId = parseInt(contentId || '');

  // 전체 아이템 리스트를 가져온다.
  const {
    data: items,
    status,
    error,
  } = useQuery<IThemeItemProps, AxiosError>(
    ['items', numThemeId],
    ({ pageParam = 1 }) => GetThemeItems(numThemeId, pageParam, 100)
  );

  // 현재 선택된 아이템을 찾는다.
  const currentItem =
    items && items.data
      ? items.data.find((item) => item.contentId === numContentId)
      : undefined;

  // 현재 선택된 아이템의 인덱스를 찾는다.
  const currentItemIndex =
    items && items.data
      ? items.data.findIndex((item) => item.contentId === numContentId)
      : -1;

  // 첫 번째 아이템의 contentId를 얻는다.
  const firstItemContentId =
    items && items.data && items.data.length > 0 ? items.data[0].contentId : 0;

  // 마지막 아이템의 contentId를 얻는다.
  const lastElementContentId =
    items && items.data && items.data.length > 0
      ? items.data[items.data.length - 1].contentId
      : 0;

  return (
    <Layout backgroundImageUrl={getBackgroundImage(themeId)}>
      <ContentContainer>
        {status === 'loading' && <div>loading...</div>}
        {status === 'error' && <div>{error.toString()}</div>}
        {status === 'success' && currentItem ? (
          <DetailedItem
            key={currentItem.contentId}
            contentId={currentItem.contentId}
            liked={currentItem.liked}
            contentUri={currentItem.contentUri}
            themeId={numThemeId}
            items={items}
            currentItemIndex={currentItemIndex}
            firstItemContentId={firstItemContentId}
            lastElementContentId={lastElementContentId}
          />
        ) : undefined}
      </ContentContainer>
    </Layout>
  );
};

export default ThemeDetailedItem;

const Layout = styled.div<{ backgroundImageUrl: string }>`
  box-sizing: border-box;
  max-width: 100%;
  width: 100%;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.backgroundImageUrl});
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
  max-width: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
`;
