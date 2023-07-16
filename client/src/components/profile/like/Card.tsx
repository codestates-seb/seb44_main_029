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
  margin: 10px;

  // 모바일 디바이스
  @media screen and (min-width: 576px) {
    width: 70%;
  }

  // PC 및 큰 디바이스
  @media screen and (min-width: 1024px) {
    width: 90%;
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
  }
`;

const ThemeTitle = styled.div`
  color: white;
  font-size: 13px;
  font-weight: bold;
`;

const VideoIconDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const VideoTitle = styled.div`
  color: white;
  font-size: 11px;
  font-weight: bold;
`;

const HeartIcon = styled.div`
  width: 20px;
  height: 20px;
`;

const HeartEmoji = styled.span`
  cursor: pointer;
`;
