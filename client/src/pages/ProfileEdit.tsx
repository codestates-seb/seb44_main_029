import { styled } from 'styled-components';
import Upload from '../components/upload/Upload';

const ProfileEdit = () => {
  return (
    <Div>
      <Upload />
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
