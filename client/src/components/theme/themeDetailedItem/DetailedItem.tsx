import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { UpdateLike } from '../../../api/api';
import { DetailedItemProps } from '../../../types/types';
import LoginForm from '../../Login/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { setIsModal, ModalState } from '../../../feature/header/modalSlice';
// import previousArrowSvg from '../../../assets/icon/icon_previous_arrow.svg';
// import nextArrowSvg from '../../../assets/icon/icon_next_arrow.svg';

const DetailedItem = ({
  contentId,
  liked,
  item,
}: // themeId,
// themeContentIds,
// currentItemIndex,
// firstItemContentId,
// lastElementContentId,
DetailedItemProps) => {
  const [likedItem, setLikedItem] = useState<boolean>(liked); // 좋아요 상태 관리를 위한 상태
  // const [isModal, setIsModal] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isModal = useSelector(
    (state: { modal: ModalState }) => state.modal.isModal
  );

  // 좋아요 업데이트를 위한 useMutation 정의
  const handleUpdateLikeMutation = useMutation(UpdateLike, {
    onSuccess: () => {
      queryClient.invalidateQueries(['items']); // 'items' 쿼리를 무효화하여 캐싱된 데이터를 서버의 최신 데이터로 갱신
    },
    onError: (error) => {
      console.log(`onError: ${error}`);
    },
  });

  // 좋아요 버튼이 클릭되었을 때 실제 처리를 담당하는 함수
  const handleLikeButtonClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    const memberId = sessionStorage.getItem('memberId');

    try {
      if (!memberId) {
        alert('로그인이 필요한 기능입니다. 🙏');
        dispatch(setIsModal(!isModal));
      } else {
        await handleUpdateLikeMutation.mutateAsync(contentId);
        setLikedItem((likedItem) => !likedItem); // 좋아요 상태를 업데이트
      }
    } catch (error) {
      console.log(error);
    }
  };

  // // 이전 및 다음 버튼의 이동 위치를 결정하는 함수
  // const getContentId = (shift: number) => {
  //   const index = currentItemIndex + shift;
  //   return themeContentIds[index] || null;
  // };

  // // 이전 및 다음 contentId 값 할당
  // const previousContentId = getContentId(-1) || lastElementContentId;
  // const nextContentId = getContentId(+1) || firstItemContentId;

  return (
    <Container>
      <ItemContainerDiv onClick={() => navigate(-1)}>
        {/* <MoveToPreviousDiv to={`/theme/${themeId}/${previousContentId}`}>
          <img src={previousArrowSvg} alt="Previous Arrow" />
        </MoveToPreviousDiv> */}
        <ItemImgDiv>
          <img
            src={item.contentUri}
            alt="content"
            onClick={(event: React.MouseEvent) => event.stopPropagation()}
          />
        </ItemImgDiv>
        <OverlayControlDiv>
          <LikeButton type="button" onClick={handleLikeButtonClick}>
            {likedItem ? '❤️' : '🤍'}
          </LikeButton>
        </OverlayControlDiv>
        {/* <MoveToNextDiv to={`/theme/${themeId}/${nextContentId}`}>
          <img src={nextArrowSvg} alt="Next Arrow" />
        </MoveToNextDiv> */}
        <CloseButtonLink
          to="#"
          onClick={(event: React.MouseEvent) => {
            event.stopPropagation();
            navigate(-1);
          }}
        >
          ✕
        </CloseButtonLink>
      </ItemContainerDiv>
      {isModal && <LoginForm />}
    </Container>
  );
};

export default DetailedItem;

const Container = styled.div`
  width: 100%;
  border-radius: 0 0 0.33rem 0.33rem;
  box-sizing: border-box;
  overflow: auto;
`;

const CloseButtonLink = styled(Link)`
  position: absolute;
  bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 1);
  background-color: transparent;
  border: none;
  transition: 0.2s;
  text-decoration: none;

  &:hover {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const ItemContainerDiv = styled.div`
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OverlayControlDiv = styled.div`
  box-sizing: border-box;
  display: flex;
  position: absolute;
  opacity: 1;
  bottom: 4rem;
  left: 0;
  width: 100%;
  padding: 0.5rem;
  pointer-events: none;
  justify-content: center;
`;

const ItemImgDiv = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding: 3.5rem 0;
  display: flex;
  justify-content: center;

  > img {
    display: flex;
    object-fit: contain;
  }
`;

const LikeButton = styled.button`
  box-sizing: border-box;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  pointer-events: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.15s;
  background-color: transparent;
  border: 0;
  font-size: 1.3rem;

  &:hover {
    color: rgba(0, 0, 0, 0.6);
  }
`;

// const MoveToDiv = css`
//   box-sizing: border-box;
//   cursor: pointer;
//   display: flex;
//   position: absolute;
//   opacity: 0.6;
//   transition: 0.2s;

//   &:hover {
//     opacity: 1;
//   }
// `;

// const MoveToPreviousDiv = styled(Link)`
//   ${MoveToDiv}
//   left: 0;
// `;

// const MoveToNextDiv = styled(Link)`
//   ${MoveToDiv}
//   right: 0;
// `;
