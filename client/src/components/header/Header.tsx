import styled, { keyframes } from 'styled-components';
import AudioPlayer from './AudioPlayer';
import Nav from './Nav';

const Header = () => {
  return (
    <Container>
      <AudioPlayer />
      <Nav />
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
  position: absolute;
  display: flex;
  justify-content: space-between;
  height: 50px;
  width: 100%;
`;
