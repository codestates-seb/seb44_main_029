import { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
      const res = await axios.post('/login', loginFormData);

      if (res.status === 200) {
        const accessToken = res.headers['Authorization'];
        const refreshToken = res.headers['Refresh'];
        // Save accessToken, memberId to local storage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        alert('login success!');
        setLoginFormData({
          email: '',
          password: '',
        });
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      // handle login failure
      alert('failed to login!');
      console.error('Login failed:', error);
    }
  };
  // 클라이언트 아이디
  const clientId: string | undefined =
    '845293206086-4aakl7vo191dgjkpked2lirhtrhg8kqq.apps.googleusercontent.com';
  return (
    <Container>
      <h1>LOGIN</h1>
      <GoogleLoginDiv>
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </GoogleOAuthProvider>
      </GoogleLoginDiv>

      <Form onSubmit={handleSubmit}>
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          value={loginFormData.email}
          onChange={handleInputChange}
        />
        {errors.email && <ErrorText>{errors.email}</ErrorText>}
        <Label>Password</Label>
        <Input
          type="password"
          name="password"
          value={loginFormData.password}
          onChange={handleInputChange}
        />
        {errors.password && <ErrorText>{errors.password}</ErrorText>}
        <LoginButton type="submit">Log In</LoginButton>
      </Form>
    </Container>
  );
};

export default LoginForm;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  background-color: #ffffff;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);
  width: 400px;
  height: 500px;
  opacity: 0.7;
`;

const GoogleLoginDiv = styled.div`
  padding: 10px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 30px;
  &:focus {
    box-shadow: 3px 3px 0px 0px #a3a3a3;
  }
`;

const LoginButton = styled.button`
  margin-top: 10px;
  padding: 10px;
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
  font-size: 14px;
  margin-top: 4px;
`;
