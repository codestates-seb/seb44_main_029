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
  // 현재 선택된 테마 아이디와 contentId를 가져온다.c
  const { themeId, contentId } = useParams<{
    themeId: string;
    contentId: string;
  }>();
  const numThemeId = parseInt(themeId || '');
  const numContentId = parseInt(contentId || '');

  const {
    data: items,
    status,
    error,
  } = useQuery<IThemeItemProps, AxiosError>(
    ['items', numThemeId],
    ({ pageParam = 1 }) => GetThemeItems(numThemeId, pageParam, 100)
  );

  const currentItem =
    items && items.data
      ? items.data.find((item) => item.contentId === numContentId)
      : undefined;

  const totalElementsNum = items?.pageInfo?.totalElements || 0;

  return (
    <Layout backgroundImageUrl={getBackgroundImage(themeId)}>
      <ContentContainer>
        {status === 'loading' && <div>loading...</div>}
        {status === 'error' && <div>{error.toString()}</div>}
        {status === 'success' && currentItem ? ( // currentItem이 존재할 때만 <DetailedItem> 컴포넌트를 렌더링
          <DetailedItem
            key={currentItem.contentId}
            contentId={currentItem.contentId}
            liked={currentItem.liked}
            contentUri={currentItem.contentUri}
            themeId={numThemeId}
            totalElementsNum={totalElementsNum}
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
  max-width: 1076px;
  width: 100%;
  flex-direction: column;
  box-shadow: 0 0 0.2rem 0.1rem rgba(255, 255, 255, 0.7);
  border-radius: 0.5rem;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
`;
