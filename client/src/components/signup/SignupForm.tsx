import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
}

const SignupForm = () => {
  const [signupFormData, setSignupFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    passwordCheck: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setSignupFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <Container>
      <h1>SIGNUP</h1>
      <Form>
        <Label htmlFor="name" isFocused={signupFormData.name !== ''}>
          Name
        </Label>
        <Input
          type="name"
          name="name"
          value={signupFormData.name}
          onChange={handleInputChange}
        />
        {errors.name && <ErrorText>{errors.name}</ErrorText>}
        <Label htmlFor="email" isFocused={signupFormData.email !== ''}>
          Email
        </Label>
        <Input
          type="email"
          name="email"
          value={signupFormData.email}
          onChange={handleInputChange}
        />
        {errors.email && <ErrorText>{errors.email}</ErrorText>}
        <Label htmlFor="password" isFocused={signupFormData.password !== ''}>
          Password
        </Label>
        <Input
          type="password"
          name="password"
          value={signupFormData.password}
          onChange={handleInputChange}
        />
        {errors.password && <ErrorText>{errors.password}</ErrorText>}
        <SignupButton type="submit">Sign Up</SignupButton>
      </Form>
    </Container>
  );
};

export default SignupForm;

// Styled Components
const Container = styled.div`
  //원영 수정 ------------
  z-index: 102; //++
  overflow: hidden; // ++
  width: 100%; //400px
  height: 100%; //550px
  background-color: rgba(255, 255, 255); //투명도 0.9
  //---------------------
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);
  opacity: 0.7;
  border-radius: 20px;
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
  padding: 10px 10px 10px;
  margin-bottom: 20px;
  border-radius: 30px;
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

const SignupButton = styled.button`
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
  font-size: 12px;
  margin-top: 4px;
`;
