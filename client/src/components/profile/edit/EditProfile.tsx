import styled, { keyframes } from 'styled-components';
import EditImg from './EditImg';
import EditName from './EditName';

const EditProfile = ({
  setIsEdit,
}: {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleButton = () => {
    setIsEdit(false);
  };
  return (
    <Container>
      <EditImg />
      <EditName />
      <BtnGroupDiv>
        <Button bgColor="#007bff" onClick={handleButton}>
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
const flashingAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const FlashingEditImg = styled(EditImg)`
  animation: ${flashingAnimation} 1s infinite;
`;
