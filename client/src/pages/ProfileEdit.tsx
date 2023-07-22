import { styled } from 'styled-components';
import MusicUpload from '../components/upload/MusicUpload';
import ImageUpload from '../components/upload/ImageUpload';

const ProfileEdit = () => {
  return (
    <Div>
      <MusicUpload />
      <ImageUpload />
    </Div>
  );
};
export default ProfileEdit;

const Div = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
