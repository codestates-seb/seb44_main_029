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
      <IconImg src={IconUser} />
      <UserInfoDiv>
        <UsernameDiv>User Name</UsernameDiv>
        <EmailDiv>Email</EmailDiv>
      </UserInfoDiv>
      <Button onClick={handleButton}>회원 정보 변경</Button>
    </Container>
  );
};

export default ChangeProfile;

const Container = styled.div`
  width: 824px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  margin-bottom: 15px;
  // 모바일 디바이스
  @media screen and (min-width: 576px) {
    width: 70%;
  }

  // PC 및 큰 디바이스
  @media screen and (min-width: 1024px) {
    width: 90%;
  }
`;
const IconImg = styled.img`
  width: 120px;
  height: 120px;
  margin: 8px 40px;
`;

const UserInfoDiv = styled.div``;
const UsernameDiv = styled.div`
  font-size: 32px;
  color: white;
  margin-bottom: 10px;
`;
const EmailDiv = styled.div`
  font-size: 24px;
  color: gray;
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
  border-radius: 5px;

  &:hover {
    background-color: #2aa58e;
  }

  // 모바일 디바이스
  @media screen and (min-width: 576px) {
    font-size: 60%;
  }

  // PC 및 큰 디바이스
  @media screen and (min-width: 1024px) {
    font-size: 90%;
  }
`;
