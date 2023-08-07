import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const TimerModal = ({ handleTogglePlay }: { handleTogglePlay: () => void }) => {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleYesButtonClick = () => {
    handleTogglePlay();
    setShowModal(false);
  };

  const handleNoButtonClick = () => {
    setShowModal(false);
  };
  // 체크시 다시는 TimerModal을 안 보여줌.
  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    sessionStorage.setItem('neverOpenTimerModal', `${e.target.checked}`);
  };

  return (
    <ModalContainer show={showModal}>
      <ModalContent>
        <div>BGM을 재생 하시겠습니까?</div>
        <ButtonContainer>
          <Button onClick={handleYesButtonClick}>예</Button>
          <Button onClick={handleNoButtonClick}>아니오</Button>
        </ButtonContainer>
        <CheckboxContainer>
          <input type="checkbox" onChange={(e) => handleCheckbox(e)} />
          <label>다음부터 띄우지 않기</label>
        </CheckboxContainer>
      </ModalContent>
    </ModalContainer>
  );
};

// 스타일드 컴포넌트를 사용하여 모달 스타일을 정의합니다.
const slideRigthIn = keyframes`
  0% , 100%{
    right: -20%;
  }
  15%, 85% {
    opacity: 1;
    right: 0%;
  }
`;

// 모달 창을 감싸는 컨테이너 스타일
const ModalContainer = styled.div<{ show: boolean }>`
  position: absolute;
  top: 40px; // header높이 == 40px
  opacity: 0;
  background-color: white;
  padding: 20px;
  border-radius: 0 0 0 20px;
  z-index: 300;
  display: ${(props) =>
    props.show
      ? 'block'
      : 'none'}; /* showModal 상태에 따라 보이기/숨기기 설정 */
  animation: ${slideRigthIn} 5s ease-in-out;
`;

// 모달 창의 내용 스타일
const ModalContent = styled.div`
  text-align: center;
`;

// 버튼들을 감싸는 컨테이너 스타일
const ButtonContainer = styled.div`
  margin-top: 20px;
`;

// 예/아니오 버튼 스타일
const Button = styled.button`
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #007bff; /* 버튼 배경 색상 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  input[type='checkbox'] {
    margin-right: 5px;
  }
`;

export default TimerModal;
