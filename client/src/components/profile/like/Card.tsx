import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
interface CardProps {
  image: string;
  themeName: string;
  videoName: string;
}

const Card = ({ image, themeName, videoName }: CardProps) => {
  const [isLiked, setIsLiked] = useState(true);
  const handleHeartIconClick = () => {
    setIsLiked(!isLiked);
  };
  return (
    <Container>
      <ImgLink to={`/theme/:themeId/:imageId`}>
        <img src={image} />
      </ImgLink>

      <ThemeTitle>{themeName}</ThemeTitle>
      <VideoIconDiv>
        <VideoTitle>{videoName}</VideoTitle>
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
  box-sizing: border-box;
  color: white;
  font-size: 13px;
  font-weight: bold;
`;

const VideoIconDiv = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (min-width: 576px) {
    width: 70%;
    height: 70%;
  }
  @media screen and (min-width: 1024px) {
    width: 100%;
    height: 100%;
  }
`;
const VideoTitle = styled.div`
  color: white;
  font-size: 11px;
  font-weight: bold;

  @media screen and (min-width: 576px) {
    font-size: 7px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 11px;
  }
`;

const HeartIcon = styled.div`
  width: 20px;
  height: 20px;
  @media screen and (min-width: 576px) {
    width: 16px;
    height: 16px;
  }
  @media screen and (min-width: 1024px) {
    width: 20px;
    height: 20px;
  }
`;

const HeartEmoji = styled.span`
  cursor: pointer;
`;
