import { useRef, useState } from 'react';
import styled from 'styled-components';
import ThemeHeader from '../components/theme/themeItemList/ThemeHeader';
import ItemListHeader from '../components/theme/themeItemList/ItemListHeader';
import ItemList from '../components/theme/themeItemList/ItemList';
import { AxiosError } from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { IThemeItemProps } from '../types/types';
import { GetThemeItems, GetThemeLikes } from '../api/api';
import getBackgroundImage from '../utils/getBackgroundImage';
import { PacmanLoader } from 'react-spinners';
import Masonry from 'react-masonry-css';
import LoginForm from '../components/Login/LoginForm';

const breakpointColumnsObj = {
  default: 6,
  1025: 4,
  768: 2,
  360: 1,
};

const ThemeItemList = () => {
  const [showLikedOnly, setShowLikedOnly] = useState<boolean>(false); // 좋아요한 아이템만 표시할지 결정하는 상태
  const targetRef = useRef<HTMLDivElement | null>(null); // 무한 스크롤을 위한 참조
  const { themeId } = useParams<{ themeId: string }>(); // 현재 선택된 테마 아이디를 가져온다.
  const numThemeId = parseInt(themeId || ''); // string 타입으로 들어온 데이터를 number 타입으로 변환한다.
  const [currentThemeTitle, setCurrentThemeTitle] = useState<string>(''); // 현재 테마 타이틀을 표시하기 위해 사용되는 상태
  const [isModal, setIsModal] = useState(false);

  // 테마 이미지 리스트를 가져와서 무하스크롤을 구현하는 함수
  const {
    data: items,
    error,
    fetchNextPage: fetchItemsNextPage,
    hasNextPage: itemsHasNextPage,
    isFetchingNextPage: itemsIsFetchingNextPage,
    status,
  } = useInfiniteQuery<IThemeItemProps, AxiosError>(
    ['items', numThemeId],
    ({ pageParam = 1 }) => GetThemeItems(numThemeId, pageParam, 18),
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage) => {
        const { pageInfo } = lastPage;
        if (pageInfo.page < pageInfo.totalPages) {
          return pageInfo.page + 1;
        }
        return false;
      },
      onSuccess: (data) => {
        if (data && data.pages && data.pages.length > 0) {
          const currentThemeTitle = data.pages[0].data[0].themeTitle;
          setCurrentThemeTitle(currentThemeTitle);
        }
      },
      enabled: showLikedOnly === false,
    }
  );

  const {
    data: likedItems,
    fetchNextPage: fetchLikedItemsNextPage,
    hasNextPage: likedItemsHasNextPage,
    isFetchingNextPage: likedItemsIsFetchingNextPage,
  } = useInfiniteQuery<IThemeItemProps, AxiosError>(
    ['likes', numThemeId],
    ({ pageParam = 1 }) => GetThemeLikes(numThemeId, pageParam, 18), // 여기서 pageParam 추가
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage) => {
        const { pageInfo } = lastPage;
        if (pageInfo.page < pageInfo.totalPages) {
          return pageInfo.page + 1;
        }
        return false;
      },
      enabled: showLikedOnly === true,
    }
  );

  // 교차점에 도달했을 때, 다음 페이지의 이미지들을 가져와 표시하는 함수
  const handleIntersect = async (entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      // showLikedOnly가 true이면, likedItems의 nextPage를 가져온다.
      if (
        showLikedOnly &&
        likedItemsHasNextPage &&
        !likedItemsIsFetchingNextPage
      ) {
        await fetchLikedItemsNextPage();
      }
      // showLikedOnly가 false이면, items의 nextPage를 가져온다.
      else if (!showLikedOnly && itemsHasNextPage && !itemsIsFetchingNextPage) {
        await fetchItemsNextPage();
      }
    }
  };

  // IntersectionObserver를 사용하여 스크롤 대상과 교차점을 관찰한다.
  // 해당 구간에 도달하면 handleIntersect 함수를 호출하여 다음 페이지를 로드한다.
  useIntersectionObserver({
    root: null,
    rootMargin: '150px',
    threshold: 0,
    target: targetRef,
    onIntersect: handleIntersect,
  });

  // 좋아요 버튼을 클릭하여 좋아요한 아이템만 표시하거나 모든 아이템을 표시하는 함수
  const handleFilterlikeButton = () => {
    const memberId = localStorage.getItem('memberId');

    if (!memberId) {
      alert('로그인이 필요한 기능입니다. 🙏');
      setIsModal(!isModal);
    } else {
      setShowLikedOnly(!showLikedOnly);
    }
  };

  // 좋아요한 아이템만 표시하도록 필터링하거나 전체 아이템 목록을 가져온다.
  const filteredItems = showLikedOnly
    ? likedItems?.pages?.flatMap((page) => page.data) || []
    : items?.pages?.flatMap((page) => page.data) || [];

  return (
    <Layout backgroundImageUrl={getBackgroundImage(themeId)}>
      <ContentContainer>
        <ThemeHeader currentThemeTitle={currentThemeTitle} />
        <ItemListHeader
          handleFilterlikeButton={handleFilterlikeButton}
          showLikedOnly={showLikedOnly}
        />
        <ItemListContainerDiv>
          {status === 'loading' && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <PacmanLoader color="rgba(255, 255, 255, 1)" size={20} />
            </div>
          )}
          {status === 'error' && <div>{error.toString()}</div>}
          <MasonryStyled
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {status === 'success' &&
              filteredItems?.map((item) => (
                <ItemList
                  key={item.contentId}
                  contentId={item.contentId}
                  liked={item.liked}
                  contentUri={item.contentUri}
                  themeId={numThemeId}
                />
              ))}
          </MasonryStyled>
          <div ref={targetRef} />
        </ItemListContainerDiv>
      </ContentContainer>
      {isModal && <LoginForm setIsModal={setIsModal} />}
    </Layout>
  );
};

export default ThemeItemList;

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
  max-width: 1920px;
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
  padding: 1rem;
  box-sizing: border-box;
  overflow: auto;
`;

const MasonryStyled = styled(Masonry)`
  display: flex;
  width: auto;
  gap: 1rem;

  .masonry-grid_column > div {
    margin-bottom: 1rem;
  }
`;
