import { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { SignUp } from '../../api/api';
import { SignUpInfo } from '../../types/types';
import { LoginButton } from '../Login/LoginForm';
interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  passwordCheck: string;
}

interface SignUpFormProps {
  setIsSignUpClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLogInClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpForm = ({
  setIsSignUpClicked,
  setIsLogInClicked,
}: SignUpFormProps) => {
  const queryClient = useQueryClient();

  const [signUpFormData, setSignUpFormData] = useState<SignUpFormData>({
    username: '',
    email: '',
    password: '',
    passwordCheck: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setSignUpFormData((prevFormData) => ({
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

    if (!signUpFormData.username) {
      errors.username = '이름을 입력해주세요.';
    }

    // 이메일 검증
    if (!signUpFormData.email) {
      // 이메일이 필수임을 나타내는 오류 메시지를 설정
      errors.email = '이메일을 입력해주세요.';
    } else if (!regexEmail.test(signUpFormData.email)) {
      errors.email = '유효하지 않은 이메일 형식입니다.';
    }

    // 비밀번호 검증
    if (!signUpFormData.password) {
      errors.password = '비밀번호를 입력해주세요.';
    } else if (!regexPw.test(signUpFormData.password)) {
      errors.password =
        '비밀번호는 8-20자 이내이어야 하며, 최소한 하나의 문자, 하나의 숫자, 하나의 특수문자를 포함해야 합니다.';
    }

    if (!signUpFormData.passwordCheck) {
      errors.passwordCheck = '비밀번호를 한번 더 입력해주세요.';
    } else if (signUpFormData.password !== signUpFormData.passwordCheck) {
      errors.passwordCheck = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(errors);

    // 검증 오류가 없을 경우 true 반환
    return Object.keys(errors).length === 0;
  };

  const signUpMutation = useMutation((formData: SignUpInfo) =>
    SignUp(formData)
  );

  // 폼 제출하는 함수
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await signUpMutation.mutateAsync(signUpFormData);
      if (response.status === 201) {
        alert('Sign Up success!');
        setSignUpFormData({
          username: '',
          email: '',
          password: '',
          passwordCheck: '',
        });
        queryClient.invalidateQueries(['signup']);
        setIsSignUpClicked(false);
        setIsLogInClicked(true);
      } else if (response.status === 202 && response.data === -1) {
        setErrors((prevErros) => ({
          ...prevErros,
          username: '이미 사용중인 이름입니다.',
        }));
      } else if (response.status === 202 && response.data === -2) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: '이미 등록된 이메일입니다.',
        }));
      } else if (response.status === 202 && response.data === -3) {
        setErrors((prevErros) => ({
          ...prevErros,
          username: '이미 사용중인 이름입니다.',
          email: '이미 등록된 이메일입니다.',
        }));
      }
    } catch (error) {
      alert('Failed to Sign Up!');
      console.error('Sign Up failed:', error);
    }
  };

  const handleLogInClick = () => {
    setIsSignUpClicked(false);
    setIsLogInClicked(true);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="username" isFocused={signUpFormData.username !== ''}>
          Username
        </Label>
        <Input
          type="username"
          name="username"
          value={signUpFormData.username}
          onChange={handleInputChange}
        />
        <ErrorText>{errors.username && errors.username}</ErrorText>

        <Label htmlFor="email" isFocused={signUpFormData.email !== ''}>
          Email
        </Label>
        <Input
          type="email"
          name="email"
          value={signUpFormData.email}
          onChange={handleInputChange}
        />
        <ErrorText>{errors.email && errors.email}</ErrorText>

        <Label htmlFor="password" isFocused={signUpFormData.password !== ''}>
          Password
        </Label>
        <Input
          type="password"
          name="password"
          value={signUpFormData.password}
          onChange={handleInputChange}
        />
        <ErrorText>{errors.password && errors.password}</ErrorText>

        <Label
          htmlFor="password"
          isFocused={signUpFormData.passwordCheck !== ''}
        >
          Passwordcheck
        </Label>
        <Input
          type="password"
          name="passwordCheck"
          value={signUpFormData.passwordCheck}
          onChange={handleInputChange}
        />
        <ErrorText>{errors.passwordCheck && errors.passwordCheck}</ErrorText>
        <SignUpButton type="submit">Sign Up</SignUpButton>
      </Form>
      <LoginButton onClick={handleLogInClick}>Log In</LoginButton>
    </Container>
  );
};

export default SignUpForm;

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
  opacity: 0.95;
  border-radius: 20px;
  > h1 {
    color: #000000;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 50px 0px 0px 0px;
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

const Label = styled.label<{ isFocused: boolean }>`
  color: ${({ isFocused }) => (isFocused ? '#166cea' : '#999')};
  font-size: ${({ isFocused }) => (isFocused ? '14px' : 'inherit')};
  margin-bottom: 5px;
  transition: all 0.5s ease;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 11px;
  margin-bottom: 10px;
  height: 12px;
`;

export const SignUpButton = styled.button`
  width: 300px;
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
