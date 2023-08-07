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
        <ColumnDiv>
          <RowDiv>
            <div>BGM을 재생 하시겠습니까?</div>
            <Button onClick={handleYesButtonClick}>예</Button>
            <Button onClick={handleNoButtonClick}>아니요</Button>
          </RowDiv>
          <CheckboxContainer>
            <label>다음부터 띄우지 않기</label>
            <input type="checkbox" onChange={(e) => handleCheckbox(e)} />
          </CheckboxContainer>
        </ColumnDiv>
      </ModalContent>
    </ModalContainer>
  );
};

// 스타일드 컴포넌트를 사용하여 모달 스타일을 정의합니다.
const slideRigthIn = keyframes`
  0% , 100%{
    bottom: -50px;
    opacity: 0;
  }
  15%, 85% {
    opacity: 1;
    bottom: 0px;
  }
`;

// 모달 창을 감싸는 컨테이너 스타일
const ModalContainer = styled.div<{ show: boolean }>`
  height: 50px;
  width: 300px;
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0%);
  background-color: rgb(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 10px 10px 0 0;
  z-index: 300;
  display: ${(props) =>
    props.show
      ? 'block'
      : 'none'}; /* showModal 상태에 따라 보이기/숨기기 설정 */
  animation: ${slideRigthIn} 5s ease-in-out;

  @media (min-width: 300px) {
    font-size: 10px;
  }
  @media (min-width: 768px) {
    font-size: 15px;
  }
`;

// 모달 창의 내용 스타일
const ModalContent = styled.div`
  text-align: center;
`;

// 예/아니오 버튼 스타일
const Button = styled.button`
  margin-left: 5px;
  background-color: #3085fc;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 3px 10px;
  font-size: 15px;
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

const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default TimerModal;
