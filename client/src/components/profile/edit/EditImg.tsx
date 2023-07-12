import styled, { keyframes } from 'styled-components';
import IconUser from '../../../assets/icon/icon_carbon_user-avatar.png';
import { useState } from 'react';
const EditImg = () => {
  const [isImgClicked, setImgClicked] = useState(false);

  return (
    <Container>
      {isImgClicked && <ModalOverlayDiv onClick={() => setImgClicked(false)} />}
      {isImgClicked && <ImgSelectShowDiv />}
      <IconImg src={IconUser} onClick={() => setImgClicked(true)} />
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

const ImgSelectShowDiv = styled.div`
  background-color: black;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  margin-top: 350px;
  z-index: 101;
  width: 60vw;
  height: 70vh;
  border-radius: 10px;
  //fadeIn 효과를, 0.5초 동안, 부드럽게, 마지막 모습 유지
  animation: ${fadeIn} 0.5s ease-in-out forwards;
`;
