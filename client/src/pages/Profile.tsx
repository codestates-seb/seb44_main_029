import styled from 'styled-components';
import backgroundImg from '../assets/images/profile_background.png';
import ChangeProfile from '../components/profile/ChangeProfile';

const Profile = () => {
  return (
    <Layout>
      <Container>
        <ChangeProfile />
      </Container>
    </Layout>
  );
};

export default Profile;

const Layout = styled.div`
  max-width: 100%;
  width: 100vw;
  height: 100vh;
  padding: 6rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${backgroundImg});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    filter: blur(5px);
    z-index: -1;
    transform: scale(1.02);
  }
`;

const Container = styled.div`
  width: 924px;
  height: 800px;
  background-color: rgba(0, 0, 0, 0.3);
`;
