import { useMutation } from '@tanstack/react-query';
import { Login } from '../../api/api';

interface LoginFormData {
  email: string;
  password: string;
}

const useLogin = () => {
  const loginMutation = useMutation(Login);

  const login = async (loginFormData: LoginFormData) => {
    try {
      const data = await loginMutation.mutateAsync(loginFormData);
      const { authorization } = data.headers;
      const { refreshToken, memberId } = data.data;
      sessionStorage.setItem('accessToken', authorization);
      sessionStorage.setItem('refreshToken', refreshToken);
      sessionStorage.setItem('memberId', memberId);
      return true; // 로그인 성공 시 true 반환
    } catch (error) {
      console.error('Log In failed:', error);
      throw error; // 로그인 실패 시 에러 throw
    }
  };

  return { login };
};

export default useLogin;
