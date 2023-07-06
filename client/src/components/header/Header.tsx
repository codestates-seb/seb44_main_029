import styled, { keyframes } from 'styled-components';
import AudioPlayer from './AudioPlayer';
import Nav from './Nav';
import { useState } from 'react';
import LoginForm from '../Login/LoginForm';
import SignUpForm from '../signup/SignUpForm';

const Header = () => {
  const [isLogInClicked, setIsLogInClicked] = useState(false);
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);

  return (
    <Container>
      <AudioPlayer />
      {isLogInClicked ? (
        <ModalOverlayDiv onClick={() => setIsLogInClicked(false)} />
      ) : isSignUpClicked ? (
        <ModalOverlayDiv onClick={() => setIsSignUpClicked(false)} />
      ) : null}
      {isLogInClicked ? (
        <LogInShowDiv>
          <LoginForm />
        </LogInShowDiv>
      ) : isSignUpClicked ? (
        <SignOutShowDiv>
          <SignUpForm />
        </SignOutShowDiv>
      ) : null}
      <Nav
        setIsLogInClicked={setIsLogInClicked}
        setIsSignUpClicked={setIsSignUpClicked}
      />
    </Container>
  );
};

export default Header;

//높이가 길어지며 끝에는 띠용띠용(?) 효과
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
//맨위에서 아래로 내려오는 효과
const slideBox = keyframes`
  0% {
    opacity: 0;
    margin-top: -300px;
  }
  100% {
    opacity: 1;
    margin-top: 350px;
  }
`;

const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  height: 50px;
  width: 100%;
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

const LogInShowDiv = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  margin-top: 350px;
  z-index: 101;
  width: 400px;
  height: 550px;
  //reboundBox 효과를, 0.8초 동안, 부드럽게, 마지막 모습 유지
  animation: ${reboundBox} 0.8s ease-in-out forwards;
`;

const SignOutShowDiv = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  z-index: 101;
  width: 400px;
  height: 550px;
  //slideBox 효과를, 0.5초 동안, 부드럽게, 마지막 모습 유지
  animation: ${slideBox} 0.5s ease-in-out forwards;
`;
