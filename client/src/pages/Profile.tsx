import styled from 'styled-components';
import backgroundImg from '../assets/images/profile_background.png';
import ChangeProfile from '../components/profile/user/ChangeProfile';
import LikeList from '../components/profile/like/LikeList';
import { cardsData } from '../components/profile/like/cardsData';
import EditProfile from '../components/profile/edit/EditProfile';
import { useState } from 'react';

const Profile = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  return (
    <Layout>
      <ContentContainer>
        {isEdit ? (
          <EditProfile setIsEdit={setIsEdit} />
        ) : (
          <ChangeProfile setIsEdit={setIsEdit} />
        )}
        <LikeList cards={cardsData} />
      </ContentContainer>
    </Layout>
  );
};

export default Profile;

export const Layout = styled.div`
  max-width: 100%;
  width: 100vw;
  max-height: 100%;
  height: 100vh;
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
    max-height: 100%;
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

export const ContentContainer = styled.div`
  box-sizing: border-box;
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
  margin: 5rem;

  // 모바일 디바이스
  @media screen and (min-width: 576px) {
    width: 90%;
  }

  // PC 및 큰 디바이스
  @media screen and (min-width: 1024px) {
    width: 100%;
  }
`;
