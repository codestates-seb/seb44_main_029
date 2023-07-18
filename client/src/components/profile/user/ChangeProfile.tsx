import styled from 'styled-components';
import IconUser from '../../../assets/icon/icon_carbon_user-avatar.png';
const ChangeProfile = ({
  setIsEdit,
}: {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleButton = () => {
    setIsEdit(true);
  };
  return (
    <Container>
      <UserInfoDiv>
        <IconImg src={IconUser} />
        <div>
          <UsernameDiv>User Name</UsernameDiv>
          <EmailDiv>Email</EmailDiv>
        </div>

        <Button onClick={handleButton}>회원 정보 변경</Button>
      </UserInfoDiv>
    </Container>
  );
};

export default ChangeProfile;

const Container = styled.div`
  width: 100%;
  border-radius: 0 0 0.33rem 0.33rem;
  color: white;
  padding: 1.5rem;
  box-sizing: border-box;
`;
const IconImg = styled.img`
  margin: 8px 40px;
  box-sizing: border-box;
`;

const UserInfoDiv = styled.div`
  width: 100%;
  border-radius: 0 0 0.33rem 0.33rem;
  color: white;
  padding: 1.5rem;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const UsernameDiv = styled.div`
  width: 100%;
  color: white;
  box-sizing: border-box;
  font-size: 32px;
  color: white;
  margin-bottom: 10px;
`;
const EmailDiv = styled.div`
  box-sizing: border-box;
  font-size: 24px;
  color: gray;
`;
const Button = styled.button`
  color: white;
  background-color: #59a395;
  border: none;
  box-sizing: border-box;
  width: 140px;
  height: 60px;
  margin-left: auto;
  margin-right: 20px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #2aa58e;
  }
`;
