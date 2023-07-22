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
  const { data } = useQuery(['userInfo'], GetUserInfo);
  const navigate = useNavigate();

  const username = data?.username;
  const email = data?.email;
  const imageUrl = data?.imageUrl;

  const ChangeMemberInfo = () => {
    setIsEdit(true);
  };

  // 회원 탈퇴
  const withdrawalMutation = useMutation(DeleteMemberInfo, {
    // 요청 성공하면 로컬 스토리지에 토큰, 멤버아이디 삭제 후 메인페이지로 이동
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

  // 회원 정보 탈퇴 버튼을 클릭했을 때
  const WithdrawalMemberInfo = () => {
    const isConfirmed = window.confirm('회원 탈퇴를 진행하시겠습니까?');
    if (isConfirmed) {
      withdrawalMutation.mutate();
    }
  };

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
          {email && (
            <WithdrawalButton
              onClick={WithdrawalMemberInfo}
              disabled={email === 'guesttest@naver.com'}
            >
              회원 정보 탈퇴
            </WithdrawalButton>
          )}
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
  box-sizing: border-box;
  width: 80%;
  display: flex;
  align-items: center;
`;

const UsernameDiv = styled.p`
  box-sizing: border-box;
  width: 50%;
  color: white;
  margin-bottom: 10px;

  @media (min-width: 150px) {
    font-size: 20px;
  }

  @media (min-width: 300px) {
    font-size: 24px;
  }
  @media (min-width: 768px) {
    font-size: 28px;
  }
  @media (min-width: 1024px) {
    font-size: 32px;
  }
`;

const EmailDiv = styled.p`
  box-sizing: border-box;
  width: 50%;
  color: gray;

  @media (min-width: 150px) {
    font-size: 12px;
  }

  @media (min-width: 300px) {
    font-size: 16px;
  }
  @media (min-width: 768px) {
    font-size: 20px;
  }
  @media (min-width: 1024px) {
    font-size: 24px;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
`;
const ChangeButton = styled.button`
  color: white;
  background-color: #59a395;
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
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

  @media (min-width: 150px) {
    font-size: 40%;
    width: 40px;
  }

  @media (min-width: 300px) {
    font-size: 40%;
    width: 80px;
  }
  @media (min-width: 768px) {
    font-size: 60%;
    width: 120px;
  }
  @media (min-width: 1024px) {
    font-size: 80%;
    width: 180px;
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

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    opacity: 0.7;
  }

  @media (min-width: 150px) {
    font-size: 40%;
    width: 40px;
  }

  @media (min-width: 300px) {
    font-size: 40%;
    width: 80px;
  }
  @media (min-width: 768px) {
    font-size: 60%;
    width: 120px;
  }
  @media (min-width: 1024px) {
    font-size: 80%;
    width: 180px;
  }
`;
