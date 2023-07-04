import { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setEmail('');
    setPassword('');
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
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
        <Input type="email" value={email} onChange={handleEmailChange} />
        <Label>Password</Label>
        <Input
          type="password"
          value={password}
          onChange={handlePasswordChange}
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
