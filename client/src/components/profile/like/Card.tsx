import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { UpdateLike } from '../../../api/api';

interface CardProps {
  image: string;
  themeId: number;
  themeTitle: string;
  contentId: number;
  handleItemDelete: () => void;
}

const Card = ({
  image,
  themeId,
  themeTitle,
  contentId,
  handleItemDelete,
}: CardProps) => {
  const queryClient = useQueryClient();

  // 좋아요 업데이트를 위한 useMutation 정의
  const handleUpdateLikeMutation = useMutation(UpdateLike, {
    onSuccess: () => {
      queryClient.invalidateQueries(['likedContents']);
    },
  });

  const handleLikedButton = async () => {
    await handleUpdateLikeMutation.mutateAsync(contentId);
    handleItemDelete();
  };

  return (
    <Container>
      <ImgLink to={`/theme/${themeId}/${contentId}`}>
        <img src={image} />
      </ImgLink>

      <ContentDiv>
        <ThemeTitle>{themeTitle}</ThemeTitle>
        <LikeButton type="button" onClick={handleLikedButton}>
          ❤️
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
    border-radius: 1rem;
    color: white;
    box-sizing: border-box;

    @media (min-width: 300px) {
      height: 250px;
    }
    @media (min-width: 500px) {
      height: 200px;
    }
    @media (min-width: 768px) {
      height: 150px;
    }
  }
`;

const ThemeTitle = styled.div`
  width: 100%;
  color: white;
  box-sizing: border-box;
  font-weight: bold;
`;

const ContentDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: white;
  box-sizing: border-box;
  margin-top: 5px;
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
