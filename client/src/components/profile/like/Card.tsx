import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { UpdateLike } from '../../../api/api';

interface CardProps {
  image: string;
  themeTitle: string;
  contentId: number;
  contentTitle: string;
  liked: boolean;
}

interface LikeButtonProps {
  isActive: boolean;
}

const Card = ({
  image,
  themeTitle,
  contentId,
  contentTitle,
  liked,
}: CardProps) => {
  const queryClient = useQueryClient();

  // 좋아요 업데이트를 위한 useMutation 정의
  const handleUpdateLikeMutation = useMutation(UpdateLike, {
    onSuccess: () => {
      queryClient.invalidateQueries(['likedContents']); // 'items' 쿼리를 무효화하여 데이터를 갱신
    },
    onError: (error) => {
      console.log(`onError: ${error}`);
    },
  });

  const handleLikedButton = async () => {
    await handleUpdateLikeMutation.mutateAsync(contentId);
  };

  return (
    <Container>
      <ImgLink to={`/theme/1/${contentId}`}>
        <img src={image} />
      </ImgLink>

      <ThemeTitle>{themeTitle}</ThemeTitle>
      <ContentDiv>
        <ContentTitle>{contentTitle}</ContentTitle>
        <LikeButton type="button" isActive={liked} onClick={handleLikedButton}>
          🤍
        </LikeButton>
      </ContentDiv>
    </Container>
  );
};

export default Card;

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0 0 0.33rem 0.33rem;
  color: white;
  padding: 1rem;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
`;
const ImgLink = styled(Link)`
  cursor: pointer;
  width: 100%;
  border-radius: 0 0 0.33rem 0.33rem;
  color: white;
  box-sizing: border-box;
  > img {
    width: 100%;
    max-height: 100px;
    height: 100%;
    border-radius: 30px;
    color: white;
    box-sizing: border-box;
  }
`;

const ThemeTitle = styled.div`
  width: 100%;
  border-radius: 0 0 0.33rem 0.33rem;
  color: white;
  box-sizing: border-box;
  font-weight: bold;
`;

const ContentDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-radius: 0 0 0.33rem 0.33rem;
  color: white;
  box-sizing: border-box;
`;
const ContentTitle = styled.div`
  width: 100%;
  border-radius: 0 0 0.33rem 0.33rem;
  color: white;
  box-sizing: border-box;
  font-weight: bold;
`;

const LikeButton = styled.button<LikeButtonProps>`
  box-sizing: border-box;
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  pointer-events: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.15s;

  &:hover {
    border: 2px solid rgba(255, 255, 255, 1);
  }

  ${(props) =>
    props.isActive
      ? css`
          border: 2px solid rgba(255, 255, 255, 1);
          background-color: rgba(0, 170, 0, 0.9);
        `
      : css`
          border: 2px solid rgba(255, 255, 255, 0.5);
          background-color: transparent;
        `}
`;
