import styled from 'styled-components';
import AudioPlayer from './AudioPlayer';

const Header = () => {
  return (
    <Container>
      <AudioPlayer />
      <NavBtn>NavBtn</NavBtn>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  width: auto;
  height: 50px;
`;

const NavBtn = styled.button`
  width: 10%;
  height: 80%;
`;
