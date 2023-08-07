import styled, { keyframes } from 'styled-components';
import AudioPlayer from './AudioPlayer';
import Nav from './Nav';
import Nav2 from './Nav2';

const Header = () => {
  return (
    <Container>
      <AudioPlayer />
      <Nav2 />
    </Container>
  );
};

export default Header;

export const slideBox = keyframes`
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
  z-index: 999;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  width: 100%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgb(0, 0, 0, 0));
  backdrop-filter: blur(7px);
`;
