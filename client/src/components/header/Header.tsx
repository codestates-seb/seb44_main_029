// Header.js
import styled from 'styled-components';
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

const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  height: 50px;
  width: 100%;
`;
