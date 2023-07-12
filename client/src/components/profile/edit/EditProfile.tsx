import styled from 'styled-components';
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
      <Button onClick={handleButton} />
    </Container>
  );
};

export default EditProfile;

const Container = styled.div`
  width: 824px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  margin-bottom: 15px;
`;
const Button = styled.button`
  color: white;
  background-color: #59a395;
  border: none;
  width: 140px;
  height: 60px;
  margin-left: auto;
  margin-right: 20px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
`;
