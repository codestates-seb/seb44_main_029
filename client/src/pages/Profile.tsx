import styled from 'styled-components';
import backgroundImg from '../assets/images/profile_background.png';
import ChangeProfile from '../components/profile/ChangeProfile';
import LikeList from '../components/profile/LikeList';
import { cardsData } from '../components/profile/cardsData';

const Profile = () => {
  return (
    <Layout>
      <ContentContainer>
        <ChangeProfile />
        <LikeList cards={cardsData} />
      </ContentContainer>
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
  }
`;

const ContentContainer = styled.div`
  max-width: 924px;
  width: 100%;
  max-height: 800px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 0 0.2rem 0.1rem rgba(255, 255, 255, 0.7);
  border-radius: 0.5rem;
  background-color: rgba(0, 0, 0, 0.3);
`;
