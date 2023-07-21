import styled from 'styled-components';
import IconUser from '../../../assets/icon/icon_carbon_user-avatar.png';
import { useQuery, useMutation } from '@tanstack/react-query';
import { GetUserInfo, DeleteMemberInfo, Logout } from '../../../api/api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const ChangeProfile = ({
  setIsEdit,
}: {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data, refetch } = useQuery(['userInfo'], GetUserInfo, {
    enabled: false, // Set initial enabled to false
  });
  const navigate = useNavigate();

  const username = data?.username;
  const email = data?.email;
  const imageUrl = data?.imageUrl;

  const ChangeMemberInfo = () => {
    setIsEdit(true);
  };

  const withdrawalMutation = useMutation(DeleteMemberInfo, {
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('memberId');
      navigate('/');
    },
    onError: (error) => {
      console.error('Error withdrawing member information:', error);
    },
  });

  const WithdrawalMemberInfo = () => {
    const isConfirmed = window.confirm('회원 탈퇴를 진행하시겠습니까?');
    if (isConfirmed) {
      withdrawalMutation.mutate();
    }
  };

  useEffect(() => {
    refetch(); // Manually trigger the data fetching when the component mounts
  }, [refetch]);

  return (
    <Container>
      <UserInfoDiv>
        <ImageDiv>
          {imageUrl ? <Img src={imageUrl} /> : <Img src={IconUser} />}
        </ImageDiv>

        <UserInfoSection>
          <InputWrapper>
            <UsernameDiv>{username}</UsernameDiv>
          </InputWrapper>

          <EmailDiv>{email}</EmailDiv>
        </UserInfoSection>
        <ButtonDiv>
          <ChangeButton onClick={ChangeMemberInfo}>회원 정보 변경</ChangeButton>
          <WithdrawalButton onClick={WithdrawalMemberInfo}>
            회원 정보 탈퇴
          </WithdrawalButton>
        </ButtonDiv>
      </UserInfoDiv>
    </Container>
  );
};

export default ChangeProfile;

const Container = styled.div`
  width: 100%;
  padding: 1.5rem;
  box-sizing: border-box;
  margin: 1.5rem, 0;
`;

const UserInfoDiv = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-radius: 1rem;
  padding: 1.5rem;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageDiv = styled.div`
  width: 50%;
  box-sizing: border-box;
  padding: 1rem;
`;

const Img = styled.img`
  width: 70%;
  margin: 8px 40px;
  box-sizing: border-box;
  border-radius: 10px;
`;

const UserInfoSection = styled.section`
  box-sizing: border-box;
  width: 100%;
  margin-left: 1.5rem;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const UsernameDiv = styled.div`
  width: 100%;
  color: white;
  box-sizing: border-box;
  font-size: 200%;
  color: white;
  margin-bottom: 10px;
`;

const EmailDiv = styled.div`
  box-sizing: border-box;
  width: 100%;
  font-size: 150%;
  color: gray;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
  width: 100%;
`;
const ChangeButton = styled.button`
  color: white;
  background-color: #59a395;
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  width: 60%;
  padding: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-left: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 20px;

  &:hover {
    background-color: #2aa58e;
  }
`;

const WithdrawalButton = styled.button`
  color: white;
  background-color: #fa4545;
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  width: 60%;
  padding: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-left: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 20px;

  &:hover {
    background-color: #f73737;
  }
`;
