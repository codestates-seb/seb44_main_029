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
            <Button onClick={handleYesButtonClick}>✅</Button>
            <Button onClick={handleNoButtonClick}>❎</Button>
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
    right: -20%;
  }
  15%, 85% {
    opacity: 1;
    right: 0%;
  }
`;

// 모달 창을 감싸는 컨테이너 스타일
const ModalContainer = styled.div<{ show: boolean }>`
  font-size: 15px;
  position: absolute;
  top: 40px; // header높이 == 40px
  opacity: 0;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.9),
    rgb(255, 255, 255, 0.9)
  );
  padding: 10px;
  border-radius: 0 0 0 10px;
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

// 예/아니오 버튼 스타일
const Button = styled.button`
  margin-left: 10px;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0;
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
`;

export default TimerModal;
