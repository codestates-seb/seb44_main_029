import styled from 'styled-components';
import IconUser from '../../../assets/icon/icon_carbon_user-avatar.png';
import { useQuery } from '@tanstack/react-query';
import { GetUserInfo } from '../../../api/api';

const ChangeProfile = ({
  setIsEdit,
}: {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data } = useQuery(['userInfo'], GetUserInfo);

  const username = data?.username;
  const email = data?.email;
  const imageUrl = data?.imageUrl;

  const handleButton = () => {
    setIsEdit(true);
  };
  return (
    <Container>
      <UserInfoDiv>
        {imageUrl ? <IconImg src={imageUrl} /> : <IconImg src={IconUser} />}
        <UserInfoSection>
          <UsernameDiv>{username}</UsernameDiv>
          <EmailDiv>{email}</EmailDiv>
        </UserInfoSection>

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
  margin: 1.5rem 0 0 0;
`;

const UserInfoDiv = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 0 0 0.33rem 0.33rem;
  color: white;
  padding: 1.5rem;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconImg = styled.img`
  width: 20%;
  margin: 8px 40px;
  box-sizing: border-box;
  border-radius: 10px;
`;

const UsernameDiv = styled.div`
  width: 100%;
  color: white;
  box-sizing: border-box;
  font-size: 200%;
  color: white;
  margin-bottom: 10px;
`;

const UserInfoSection = styled.section`
  box-sizing: border-box;
  width: 80%;
  margin-left: 1.5rem;
`;

const EmailDiv = styled.div`
  box-sizing: border-box;
  width: 100%;
  font-size: 150%;
  color: gray;
`;
const Button = styled.button`
  color: white;
  background-color: #59a395;
  border: none;
  box-sizing: border-box;
  width: 30%;
  padding: 1.5rem;
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
