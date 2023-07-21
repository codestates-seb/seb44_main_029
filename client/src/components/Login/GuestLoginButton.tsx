import styled from 'styled-components';
import { TbUserCircle } from 'react-icons/tb';
import { useQueryClient, useMutation } from '@tanstack/react-query';
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

  const queryClient = useQueryClient();
  const loginMutation = useMutation(Login, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['login']);
      const accessToken = data.headers['authorization'];
      const refreshToken = data.data.refreshToken;
      const memberId = data.data.memberId;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('memberId', memberId);
    },
  });

  const guestButtonClick = async () => {
    try {
      await loginMutation.mutateAsync(loginFormData);
      alert('Log In success!');
      queryClient.invalidateQueries(['login']);
      window.location.href = '/profile';
    } catch (error) {
      alert('Failed to Log In!');
      console.error('Log In failed:', error);
    }
  };

  return (
    <GuestButton>
      <S_TbUserCircle onClick={guestButtonClick} />
      Guest로 로그인
    </GuestButton>
  );
};

export default GuestLoginButton;

const GuestButton = styled.button`
  width: 300px;
  height: 40px;
  background-color: white;
  border: 1px solid rgb(224, 224, 224);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 8px;
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