import styled from 'styled-components';
import IconUser from '../../../assets/icon/icon_carbon_user-avatar.png';
import { useQuery, useMutation } from '@tanstack/react-query';
import { GetUserInfo, DeleteMemberInfo } from '../../../api/api';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

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
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      sessionStorage.removeItem('memberId');
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

  // 화면 너비에 따라 버튼 이름 변경
  const [changeButtonName, setChangeButtonName] = useState('회원 정보 변경');
  const [withdrawalButtonName, setWithdrawalButtonName] =
    useState('회원 정보 탈퇴');

  useEffect(() => {
    function updateButtonName() {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 400) {
        setChangeButtonName('변경');
        setWithdrawalButtonName('탈퇴');
      } else {
        setChangeButtonName('회원 정보 변경');
        setWithdrawalButtonName('회원 정보 탈퇴');
      }
    }

    updateButtonName();
    window.addEventListener('resize', updateButtonName);

    return () => {
      window.removeEventListener('resize', updateButtonName);
    };
  }, []);

  return (
    <Container>
      <UserInfoDiv>
        <ImageDiv>
          {imageUrl ? <Img src={imageUrl} /> : <Img src={IconUser} />}
        </ImageDiv>

        <UserInfo>
          <InputWrapper>
            <UsernameDiv>{username}</UsernameDiv>
          </InputWrapper>

          <EmailDiv>{email}</EmailDiv>
        </UserInfo>
        <ButtonDiv>
          <ChangeButton
            onClick={ChangeMemberInfo}
            disabled={email === 'guest@gmail.com'}
          >
            {changeButtonName}
          </ChangeButton>

          <WithdrawalButton
            onClick={WithdrawalMemberInfo}
            disabled={email === 'guest@gmail.com'}
          >
            {withdrawalButtonName}
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
  margin: 8px 10px;
  box-sizing: border-box;
  border-radius: 10px;
  width: 48px;

  @media (min-width: 576px) {
    width: 64px;
  }
  @media (min-width: 768px) {
    width: 90px;
  }
  @media (min-width: 1024px) {
    width: 120px;
  }
`;

const UserInfo = styled.div`
  box-sizing: border-box;
  width: 100%;
`;

const InputWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
`;

const UsernameDiv = styled.div`
  box-sizing: border-box;
  width: 100%;
  color: white;
  margin-bottom: 10px;
  font-size: 16px;

  @media (min-width: 576px) {
    font-size: 24px;
  }
  @media (min-width: 768px) {
    font-size: 28px;
  }
  @media (min-width: 1024px) {
    font-size: 32px;
  }
`;

const EmailDiv = styled.div`
  box-sizing: border-box;
  width: 100%;
  color: gray;
  font-size: 8px;

  @media (min-width: 576px) {
    font-size: 16px;
  }
  @media (min-width: 768px) {
    font-size: 20px;
  }
  @media (min-width: 1024px) {
    font-size: 18px;
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

  font-size: 1px;
  width: 50px;

  &:hover {
    background-color: #2aa58e;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    opacity: 0.7;
  }

  @media (min-width: 400px) {
    font-size: 4px;
    width: 80px;
  }

  @media (min-width: 576px) {
    font-size: 6px;
    width: 100px;
  }
  @media (min-width: 768px) {
    font-size: 8px;
    width: 120px;
  }
  @media (min-width: 1024px) {
    font-size: 12px;
    width: 140px;
  }
`;

const WithdrawalButton = styled.button`
  color: white;
  background-color: #fa4545;
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

  font-size: 1px;
  width: 50px;

  &:hover {
    background-color: #f73737;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    opacity: 0.7;
  }

  @media (min-width: 400px) {
    font-size: 4px;
    width: 80px;
  }

  @media (min-width: 576px) {
    font-size: 6px;
    width: 100px;
  }
  @media (min-width: 768px) {
    font-size: 8px;
    width: 120px;
  }
  @media (min-width: 1024px) {
    font-size: 12px;
    width: 140px;
  }
`;
