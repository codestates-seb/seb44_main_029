import styled, { keyframes } from 'styled-components';
import IconUser from '../../../assets/icon/icon_carbon_user-avatar.png';
import { useState } from 'react';

const EditImg = ({
  setImgUrl,
}: {
  setImgUrl: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [isIconImgClicked, setIconImgClicked] = useState(false);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const urlList = [
    'https://i.pinimg.com/236x/91/75/31/9175319b09ac93cd30acd3763c44d1f3.jpg',
    'https://dorriez.com/wp-content/uploads/2023/05/img-12.jpg',
    'https://blog.kakaocdn.net/dn/yDtgP/btrJaVA4iLN/9QtVWLrCIrUtDz7U4Udsr0/img.jpg',
    'https://i.pinimg.com/originals/8c/fe/55/8cfe55a7e420f5118f6796e74b2b691a.jpg',
    'https://post-phinf.pstatic.net/MjAyMjExMTdfNzYg/MDAxNjY4NjUwMTQxMzU2.KOS5Iab6G0-88otScR2vsaZmoimqN8v-b5QiMhSkj5og.qsrQszwww-AZFP32Vs0gfJpqYp4tWpaXQYRupweSlOMg.JPEG/1633c62db4f2af416b327f14ce3c3100.jpg?type=w800_q75',
  ];
  //클릭 시 api 인자 전달, 현재 프로필 변경 예시 보여주기
  const handleClick = (url: string) => {
    setImgUrl(url);
    setCurrentUrl(url);
  };
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
      <IconImg
        src={currentUrl ? currentUrl : IconUser}
        onClick={() => setIconImgClicked(true)}
      />
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

const Container = styled.div``;
const IconImg = styled.img`
  width: 120px;
  height: 120px;
  margin: 8px 40px;
  transition: scale 0.3s;
  border-radius: 10px;
  &:hover {
    scale: 1.1;
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
