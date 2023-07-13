import styled from 'styled-components';
import EditImg from './EditImg';
import EditName from './EditName';
import { useState } from 'react';

const EditProfile = ({
  setIsEdit,
}: {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  const handleButton = () => {
    setIsEdit(false);
  };

  const handleSaveButton = () => {
    const confirmed = window.confirm('정말 저장하시겠습니까?');
    if (confirmed) {
      console.log(imgUrl, userName);
      setIsEdit(false);
    }
  };

  return (
    <Container>
      <EditImg setImgUrl={setImgUrl} />
      <EditName setUserName={setUserName} />
      <BtnGroupDiv>
        <Button bgColor="#007bff" onClick={handleSaveButton}>
          저장
        </Button>
        <Button bgColor="#ff0000" onClick={handleButton}>
          취소
        </Button>
      </BtnGroupDiv>
    </Container>
  );
};

export default EditProfile;

const Container = styled.div`
  width: 824px;
  height: 180px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  margin-bottom: 15px;
`;

const BtnGroupDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
`;
const Button = styled.button<{ bgColor: string }>`
  color: white;
  background-color: ${(props) => props.bgColor || '#59a395'};
  border: none;
  border-radius: 5px;
  width: 140px;
  height: 60px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  margin-right: 20px;
`;
