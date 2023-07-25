import styled from 'styled-components';
import { TbUserCircle } from 'react-icons/tb';
import { useMutation } from '@tanstack/react-query';
import { Login } from '../../api/api';

interface LoginFormData {
  email: string;
  password: string;
}

const GuestLoginButton: React.FC = () => {
  const loginFormData: LoginFormData = {
    email: 'guest@gmail.com',
    password: 'guest123!@#',
  };

  const loginMutation = useMutation(Login, {
    onSuccess: (data) => {
      const accessToken = data.headers['authorization'];
      const refreshToken = data.data.refreshToken;
      const memberId = data.data.memberId;
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);
      sessionStorage.setItem('memberId', memberId);
    },
  });

  const guestButtonClick = async () => {
    try {
      await loginMutation.mutateAsync(loginFormData);
      alert('Log In success!');
      window.location.href = '/profile';
    } catch (error) {
      alert('Failed to Log In!');
      console.error('Log In failed:', error);
    }
  };

  return (
    <GuestButton onClick={guestButtonClick}>
      <S_TbUserCircle />
      Guest로 로그인
    </GuestButton>
  );
};

export default GuestLoginButton;

const GuestButton = styled.button`
  box-sizing: border-box;
  width: 75%;
  height: 8%;
  background-color: white;
  border: 1px solid rgb(224, 224, 224);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  &:hover {
    background-color: #f1f5f9;
  }
`;

const S_TbUserCircle = styled(TbUserCircle)`
  width: 24px;
  height: 24px;
  margin-right: 10px;
  color: #4b4b4b;
`;
