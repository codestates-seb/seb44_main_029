import axios from 'axios';
import styled from 'styled-components';
import Google from '../../assets/icon/icon_google.png';

const GoogleLoginButton: React.FC = () => {
  const handleOAuthClick = async () => {
    try {
      const response = await axios.get(
        'https://3a11-175-208-216-56.ngrok-free.app/oauth2/authorization/google'
      );
      const accessToken = response.headers['access-token'];
      const refreshToken = response.headers['refresh-token'];
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      window.location.href = response.data.redirectUrl;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <OAuthButton onClick={handleOAuthClick}>
      <Img src={Google} alt="Google logo" />
      Login with Google
    </OAuthButton>
  );
};

export default GoogleLoginButton;

const OAuthButton = styled.button`
  width: 200px;
  height: 40px;
  background-color: white;
  border: 1px solid rgb(224, 224, 224);
  cursor: pointer;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;
