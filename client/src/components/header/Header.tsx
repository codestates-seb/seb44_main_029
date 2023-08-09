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
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgb(0, 0, 0, 0));
  @media (min-width: 300px) {
    flex-direction: column;
    height: 70px;
  }
  @media (min-width: 768px) {
    flex-direction: row;
    height: 40px;
  }
`;
