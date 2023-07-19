import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface CardProps {
  image: string;
  themeTitle: string;
  contentId: number;
  contentTitle: string;
}

const Card = ({ image, themeTitle, contentId, contentTitle }: CardProps) => {
  const [isLiked, setIsLiked] = useState(true);
  const handleHeartIconClick = () => {
    setIsLiked(!isLiked);
  };
  return (
    <Container>
      <ImgLink to={`/theme/1/${contentId}`}>
        <img src={image} />
      </ImgLink>

      <ThemeTitle>{themeTitle}</ThemeTitle>
      <VideoIconDiv>
        <VideoTitle>{contentTitle}</VideoTitle>
        <HeartIcon onClick={handleHeartIconClick}>
          <HeartEmoji>{isLiked ? '❤️' : '🤍'}</HeartEmoji>
        </HeartIcon>
      </VideoIconDiv>
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

const VideoIconDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-radius: 0 0 0.33rem 0.33rem;
  color: white;
  box-sizing: border-box;
`;
const VideoTitle = styled.div`
  width: 100%;
  border-radius: 0 0 0.33rem 0.33rem;
  color: white;
  box-sizing: border-box;
  font-weight: bold;
`;

const HeartIcon = styled.div`
  width: 100%;
  border-radius: 0 0 0.33rem 0.33rem;
  color: white;
  box-sizing: border-box;
`;

const HeartEmoji = styled.span`
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
`;
