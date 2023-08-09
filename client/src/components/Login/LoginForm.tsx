import { useState, ChangeEvent, FormEvent } from 'react';
import styled, { keyframes } from 'styled-components';
import SignUpFormTwo from '../signup/SignupForm';
import GoogleLoginButton from './GoogleLoginButton';
import GuestLoginButton from './GuestLoginButton';
import { useDispatch } from 'react-redux';
import { setIsModal } from '../../feature/header/modalSlice';
import useLogin from '../../hooks/login/useLogin';
import Swal from 'sweetalert2';
interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const dispatch = useDispatch();
  const { login } = useLogin();

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

  // 폼 제출하는 함수
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await login(loginFormData);
      if (response.status === 200) {
        // 관리자 판단
        if (loginFormData.email === 'admin@adadad.com') {
          sessionStorage.setItem('admin', 'true');
        } else {
          sessionStorage.removeItem('admin');
        }
        Swal.fire({
          icon: 'success',
          title: '로그인 성공!',
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            setLoginFormData({
              email: '',
              password: '',
            });
            dispatch(setIsModal(false));
            window.location.href = '/profile';
          }
        });
        // 탈퇴한 회원
      } else if (response.status === 202 && response.data === -7) {
        Swal.fire({
          icon: 'error',
          title: '존재하지 않는 회원입니다.',
        }).then(() => {
          sessionStorage.removeItem('accessToken');
          sessionStorage.removeItem('refreshToken');
          sessionStorage.removeItem('memberId');
          setLoginFormData({
            email: '',
            password: '',
          });
          dispatch(setIsModal(true));
        });
        // 일반 유저 및 관리자 중복 로그인
      } else if (response.status === 202 && response.data === -6) {
        Swal.fire({
          icon: 'warning',
          title:
            '중복 로그인이 되어 로그아웃 처리됩니다. 로그인을 다시 진행해주세요.',
        }).then(() => {
          sessionStorage.removeItem('accessToken');
          sessionStorage.removeItem('refreshToken');
          sessionStorage.removeItem('memberId');
          window.location.href = '/';
        });
      }
    } catch (error: any) {
      // 가입 기록이 없는 정보
      if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: '로그인 실패!',
          text: '이메일, 패스워드를 다시 입력해 주세요.',
          confirmButtonColor: '#4b4b4b',
        });

        setLoginFormData({
          email: '',
          password: '',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: '로그인 실패!',
          confirmButtonColor: '#4b4b4b',
        });
      }
    }
  };

  const handleSignUpClick = () => {
    setIsSignUpClicked(true);
  };

  return (
    <>
      <ModalOverlayDiv onClick={() => dispatch(setIsModal(false))} />
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
  margin-top: 10px;
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
  margin-bottom: 10px;
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
  margin-bottom: 15px;
  height: 15px;
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
