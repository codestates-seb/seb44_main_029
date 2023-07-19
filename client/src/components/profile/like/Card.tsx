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
  width: 120px;
  height: 140px;
  background-color: rgba(0, 0, 0, 0.3);
  margin: 15px;

  @media screen and (min-width: 576px) {
    width: 50%;
  }

  @media screen and (min-width: 740px) {
    width: 70%;
  }
  @media screen and (min-width: 1024px) {
    width: 80%;
  }
`;

const ImgLink = styled(Link)`
  cursor: pointer;
  > img {
    border-radius: 30px;
    width: 100%;
    max-height: 100px;
    height: 100%;
    &:hover {
      border: 1px solid rgba(255, 255, 255, 0.7);
    }
    @media screen and (min-width: 576px) {
      width: 50%;
      height: 50%;
    }

    @media screen and (min-width: 730px) {
      width: 70%;
      height: 70%;
    }
    @media screen and (min-width: 1024px) {
      width: 100%;
      height: 100%;
    }
  }
`;

const ThemeTitle = styled.div`
  color: white;
  font-size: 13px;
  font-weight: bold;

  @media screen and (min-width: 576px) {
    font-size: 10px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 13px;
  }
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
