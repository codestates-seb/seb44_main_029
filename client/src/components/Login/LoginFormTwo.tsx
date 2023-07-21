import { useState, ChangeEvent, FormEvent } from 'react';
import styled, { keyframes } from 'styled-components';
import SignUpFormTwo from '../signup/SignupFormTwo';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Login } from '../../api/api';
import GoogleLoginButton from './GoogleLoginButton';
import { SignUpButton } from '../signup/SignupForm';

interface LoginFormData {
  email: string;
  password: string;
}
interface LoginFormProps {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const LoginFormTwo = ({ setIsModal }: LoginFormProps) => {
  const queryClient = useQueryClient();

  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setLoginFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  // 이메일, 비밀번호 유효성 검사
  const validateForm = (): boolean => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexPw =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
    // 검증 과정에서 발생한 오류를 저장하기 위해 빈 errors 객체를 초기화
    const errors: { [key: string]: string } = {};

    // 이메일 검증
    if (!loginFormData.email) {
      // 이메일이 필수임을 나타내는 오류 메시지를 설정
      errors.email = '이메일을 입력해주세요.';
    } else if (!regexEmail.test(loginFormData.email)) {
      errors.email = '유효하지 않은 이메일 형식입니다.';
    }

    // 비밀번호 검증
    if (!loginFormData.password) {
      errors.password = '비밀번호를 입력해주세요.';
    } else if (!regexPw.test(loginFormData.password)) {
      errors.password =
        '비밀번호는 8-20자 이내이어야 하며, 최소한 하나의 문자, 하나의 숫자, 하나의 특수문자를 포함해야 합니다.';
    }

    setErrors(errors);

    // 검증 오류가 없을 경우 true 반환
    return Object.keys(errors).length === 0;
  };

  const loginMutation = useMutation(Login, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['login']);
      console.log('data', data);
      const accessToken = data.headers['authorization'];
      const refreshToken = data.data.refreshToken;
      const memberId = data.data.memberId;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('memberId', memberId);
    },
  });

  // 폼 제출하는 함수
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await loginMutation.mutateAsync(loginFormData);
      alert('Log In success!');
      setLoginFormData({
        email: '',
        password: '',
      });
      queryClient.invalidateQueries(['login']);
      setIsModal(false);
      window.location.href = '/profile';
    } catch (error) {
      alert('Failed to Log In!');
      console.error('Log In failed:', error);
    }
  };

  const handleSignUpClick = () => {
    setIsSignUpClicked(true);
  };

  return (
    <>
      <ModalOverlayDiv onClick={() => setIsModal(false)} />
      {!isSignUpClicked ? (
        <Container>
          <GoogleLoginButton />
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="email" isFocused={loginFormData.email !== ''}>
              Email
            </Label>
            <Input
              type="email"
              name="email"
              value={loginFormData.email}
              onChange={handleInputChange}
            />
            <ErrorText>{errors.email && errors.email}</ErrorText>
            <Label htmlFor="password" isFocused={loginFormData.password !== ''}>
              Password
            </Label>
            <Input
              type="password"
              name="password"
              value={loginFormData.password}
              onChange={handleInputChange}
            />
            <ErrorText>{errors.password && errors.password}</ErrorText>
            <LoginButton type="submit">Log In</LoginButton>
          </Form>
          <SignUpButton onClick={handleSignUpClick}>Sign Up</SignUpButton>
        </Container>
      ) : (
        <SignUpFormTwo setIsSignUpClicked={setIsSignUpClicked} />
      )}
    </>
  );
};
export default LoginFormTwo;

const reboundBox = keyframes`
  0% {
    height: 100px;
  }
  40%{
    height: 650px;
  }
  60%{
    height: 500px;
  }
  80%{
    height: 600px;
  }
  100% {
    height: 550px;
  }
`;

// Styled Components
const Container = styled.div`
  position: fixed; // 화면 중앙에 고정되도록 설정
  top: 50%; // 화면 세로 중앙 위치
  left: 50%; // 화면 가로 중앙 위치
  transform: translate(-50%, -50%); // 중앙 정렬을 위한 변환
  z-index: 102;
  overflow: hidden;
  width: 400px;
  height: 550px;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);
  opacity: 0.95;
  border-radius: 20px;

  //slideBox 효과를, 0.5초 동안, 부드럽게, 마지막 모습 유지
  animation: ${reboundBox} 0.8s ease-in-out forwards;
  > h1 {
    color: #000000;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Label = styled.label<{ isFocused: boolean }>`
  color: ${({ isFocused }) => (isFocused ? '#166cea' : '#999')};
  font-size: ${({ isFocused }) => (isFocused ? '14px' : 'inherit')};
  margin-bottom: 5px;
  transition: all 0.5s ease;
`;

const Input = styled.input`
  padding: 20px 10px 10px;
  margin-bottom: 20px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #999;
  font-size: 18px;
  color: #000000;
  outline: none;
  &:focus {
    box-shadow: 3px 3px 3px 1px #1875ff;
  }
`;

export const LoginButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  width: 300px;
  background-color: #1875ff;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;

  &:hover {
    background-color: #045bdf;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 11px;
  margin-bottom: 10px;
  height: 12px;
`;

const ModalOverlayDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;