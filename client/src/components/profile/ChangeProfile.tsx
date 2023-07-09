import styled from 'styled-components';
import IconUser from '../../assets/icon/icon_carbon_user-avatar.png';

const ChangeProfile = () => {
  return (
    <Container>
      <IconImg src={IconUser} />
      <div>
        <UsernameDiv>User Name</UsernameDiv>
        <EmailDiv>Email</EmailDiv>
      </div>
      <Button>회원 정보 변경</Button>
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
`;
const IconImg = styled.img`
  width: 120px;
  height: 120px;
  margin: 8px 40px;
`;

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
`;
