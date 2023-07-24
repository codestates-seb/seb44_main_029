import styled, { keyframes } from 'styled-components';
import IconUser from '../../../assets/icon/icon_carbon_user-avatar.png';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GetUserInfo } from '../../../api/api';
import img1 from '../../../assets/profile/1.jpeg';
import img2 from '../../../assets/profile/2.jpeg';
import img3 from '../../../assets/profile/3.jpeg';
import img4 from '../../../assets/profile/4.jpeg';
import img5 from '../../../assets/profile/5.jpeg';

const EditImg = ({
  setImgUrl,
}: {
  setImgUrl: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [isIconImgClicked, setIconImgClicked] = useState(false);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const urlList = [img1, img2, img3, img4, img5];
  //클릭 시 api 인자 전달, 현재 프로필 변경 예시 보여주기
  const handleClick = (url: string) => {
    setImgUrl(url);
    setCurrentUrl(url);
    setIconImgClicked(false);
  };

  const { data } = useQuery(['userInfo'], GetUserInfo, {
    enabled: false,
  });
  const imageUrl = data?.imageUrl;

  return (
    <Container>
      {isIconImgClicked && (
        <>
          <ModalOverlayDiv onClick={() => setIconImgClicked(false)} />
          <ImgSelectDiv>
            {urlList.map((url) => (
              <Img key={url} src={url} onClick={() => handleClick(url)} />
            ))}
          </ImgSelectDiv>
        </>
      )}
      {imageUrl ? (
        <IconImg
          src={currentUrl ? currentUrl : imageUrl}
          onClick={() => setIconImgClicked(true)}
        />
      ) : (
        <IconImg
          src={currentUrl ? currentUrl : IconUser}
          onClick={() => setIconImgClicked(true)}
        />
      )}
    </Container>
  );
};

export default EditImg;

// 투명했다가 나타나는 효과
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Container = styled.div`
  width: 50%;
  box-sizing: border-box;
  padding: 1rem;
`;

const IconImg = styled.img`
  margin: 8px 10px;
  box-sizing: border-box;
  border-radius: 10px;
  transition: scale 0.3s;
  cursor: pointer;
  width: 48px;

  &:hover {
    scale: 1.1;
  }
  @media (min-width: 576px) {
    width: 64px;
  }
  @media (min-width: 768px) {
    width: 90px;
  }
  @media (min-width: 1024px) {
    width: 120px;
  }
`;

const ModalOverlayDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background-color: black;
  z-index: 100;
`;

const ImgSelectDiv = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  z-index: 101;
  width: 50vw;
  border-radius: 10px;
  border: 1px dashed white;
  background-color: black;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  //fadeIn 효과를, 0.5초 동안, 부드럽게, 마지막 모습 유지
  animation: ${fadeIn} 0.5s ease-in-out forwards;
`;

const Img = styled.img`
  margin: 30px;
  width: 150px;
  height: 150px;
  border-radius: 10px;
  object-fit: cover;
  transition: scale 0.3s;
  border: 1px dashed white;
  &:hover {
    scale: 1.1;
  }
`;
