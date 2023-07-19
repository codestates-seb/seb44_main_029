import styled from 'styled-components';
import EditImg from './EditImg';
import EditName from './EditName';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { PetchEditProfile } from '../../../api/api';

const EditProfile = ({
  setIsEdit,
}: {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  //취소버튼
  const handleCancleButton = () => {
    setIsEdit(false);
  };
  //저장버튼
  const handleSaveButton = async () => {
    const confirmed = window.confirm('정말 저장하시겠습니까?');
    if (confirmed) {
      await editMutation.mutateAsync(); //  editMutation을 비동기로 실행
      setIsEdit(false);
    }
  };

  const editMutation = useMutation(() =>
    PetchEditProfile({ imageUrl: imgUrl, username: userName })
  );

  return (
    <Container>
      <EditInfoDiv>
        <EditImg setImgUrl={setImgUrl} />
        <EditName setUserName={setUserName} />
        <BtnGroupDiv>
          <Button bgColor="#007bff" onClick={handleSaveButton}>
            저장
          </Button>
          <Button bgColor="#ff0000" onClick={handleCancleButton}>
            취소
          </Button>
        </BtnGroupDiv>
      </EditInfoDiv>
    </Container>
  );
};

export default EditProfile;

const Container = styled.div`
  width: 100%;
  padding: 1.5rem;
  box-sizing: border-box;
  margin: 1.5rem, 0;
`;

const EditInfoDiv = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-radius: 1rem;
  padding: 1.5rem;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BtnGroupDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
  width: 100%;
`;

const Button = styled.button<{ bgColor: string }>`
  color: white;
  background-color: ${(props) => props.bgColor || '#59a395'};
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  width: 60%;
  padding: 1rem;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  margin-left: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 20px;
`;
