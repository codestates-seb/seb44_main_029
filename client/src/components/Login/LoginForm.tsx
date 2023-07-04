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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post('/login', loginFormData);

      if (res.status !== 200) throw res;
      const accessToken = res.headers['Authorization'];
      const refreshToken = res.headers['Refresh'];
      // 로컬스토리지에 accessToken, memberId 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      alert('login success!');
      setLoginFormData({
        email: '',
        password: '',
      });
    } catch (error) {
      // 로그인 실패 처리
      alert('failed to login!');
      console.error('Login failed:', error);
    }
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setLoginFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
          required
        />
        <Label>Password</Label>
        <Input
          type="password"
          name="password"
          value={loginFormData.password}
          onChange={handleInputChange}
          required
        />
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
