import { useState, ChangeEvent, FormEvent } from 'react';
import styled, { keyframes } from 'styled-components';
import SignUpFormTwo from '../signup/SignupForm';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Login } from '../../api/api';
import GoogleLoginButton from './GoogleLoginButton';
import GuestLoginButton from './GuestLoginButton';
import { useNavigate } from 'react-router';

interface LoginFormData {
  email: string;
  password: string;
}
interface LoginFormProps {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const LoginForm = ({ setIsModal }: LoginFormProps) => {
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
      const response = await loginMutation.mutateAsync(loginFormData);
      if (response.status === 200) {
        // 관리자 판단
        loginFormData.email === 'admin@adadad.com'
          ? sessionStorage.setItem('admin', 'true')
          : sessionStorage.removeItem('admin');
        alert('로그인 성공!');
        setLoginFormData({
          email: '',
          password: '',
        });
        queryClient.invalidateQueries(['login']);
        setIsModal(false);
        window.location.href = '/profile';
      } else if (response.status === 202 && response.data === -7) {
        alert('존재하지 않는 회원입니다.');
        setLoginFormData({
          email: '',
          password: '',
        });
        setIsModal(true);
      } else if (response.status === 202 && response.data === -6) {
        alert('중복 로그인이 되어 로그아웃 처리됩니다.');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('memberId');
        window.location.href = '/';
      }
    } catch (error) {
      alert('로그인 실패!');
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
          <GuestLoginButton />
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
export default LoginForm;

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

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
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

  animation: ${fadeIn} 0.3s ease-in-out forwards;
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
  color: ${({ isFocused }) => (isFocused ? '#131313' : '#999')};
  font-size: ${({ isFocused }) => (isFocused ? '14px' : 'inherit')};
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
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
    box-shadow: 3px 3px 3px 1px #4b4b4b;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  height: 15%;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  margin-top: 10px;
  padding: 10px;
  background-color: #4b4b4b;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0.8rem 0.5rem 1.4rem #bec5d0, -0.3rem -0.4rem 0.8rem #fbfbfb;

  &:active {
    box-shadow: inset -0.3rem -0.1rem 1.4rem #2c2c2c,
      inset 0.3rem 0.4rem 0.8rem #bec5d0;
    cursor: pointer;
  }

  &:hover {
    background-color: #424242;
  }
`;

const SignUpButton = styled.button`
  width: 75%;
  height: 8%;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  margin-top: 10px;
  padding: 10px;
  background-color: #4b4b4b;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0.8rem 0.5rem 1.4rem #bec5d0, -0.3rem -0.4rem 0.8rem #fbfbfb;

  &:active {
    box-shadow: inset -0.3rem -0.1rem 1.4rem #2c2c2c,
      inset 0.3rem 0.4rem 0.8rem #bec5d0;
    cursor: pointer;
  }

  &:hover {
    background-color: #424242;
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
