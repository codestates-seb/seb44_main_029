import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import getBackgroundImage from '../utils/getBackgroundImage';
import { GetDetailedItem } from '../api/api';
import { IDetailedItemProps } from '../types/types';
import DetailedItem from '../components/theme/themeDetailedItem/DetailedItem';
import { PacmanLoader } from 'react-spinners';

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
    data: item,
    status,
    error,
  } = useQuery<IDetailedItemProps, AxiosError>(['item', numContentId], () =>
    GetDetailedItem(numContentId)
  );

  // 현재 선택된 아이템 정보 = currentItem, 현재 테마 아이템들의 contentId 값 리스트가 담긴 배열 정보 = themeContentIds
  const { contentResponseDto: currentItem, contentIds: themeContentIds = [] } =
    item || {};

  // 현재 선택된 아이템의 index 값
  const currentItemIndex = themeContentIds.indexOf(numContentId);

  // 첫 번째 아이템의 contentId 값
  const firstItemContentId = themeContentIds[0] || 0;

  // 마지막 아이템의 contentId 값
  const lastElementContentId = themeContentIds[themeContentIds.length - 1] || 0;

  return (
    <Layout backgroundImageUrl={getBackgroundImage(themeId)}>
      {status === 'loading' && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <PacmanLoader color="rgba(255, 255, 255, 1)" size={20} />
        </div>
      )}
      <ContentContainer>
        {status === 'error' && <div>{error.toString()}</div>}
        {status === 'success' && currentItem ? (
          <DetailedItem
            key={currentItem.contentId}
            themeId={numThemeId}
            contentId={currentItem.contentId}
            liked={currentItem.liked}
            item={currentItem}
            themeContentIds={themeContentIds}
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
