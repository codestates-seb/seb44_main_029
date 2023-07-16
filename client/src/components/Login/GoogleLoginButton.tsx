import styled from 'styled-components';
import Google from '../../assets/icon/icon_google.png';
import { GoogleLogin, GoogleLoginTokens } from '../../api/api';
import { useQueryClient, useMutation } from '@tanstack/react-query';

const GoogleLoginButton: React.FC = () => {
  const queryClient = useQueryClient();

  const googleLoginMutation = useMutation(GoogleLogin, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['googleLogin']);
      console.log('data', data);
      window.location.href = data.headers.location;
      // const accessToken = data.headers['authorization'];
      // const refreshToken = data.data.refreshToken;
      // const memberId = data.data.memberId;

      // localStorage.setItem('accessToken', accessToken);
      // localStorage.setItem('refreshToken', refreshToken);
      // localStorage.setItem('memberId', memberId);
    },
  });

  const googleLoginTokensMutation = useMutation(GoogleLoginTokens, {
    onSuccess: (data) => {
      console.log('googleLoginTokens: ', data);
      const { access_token, refresh_token } = data;
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('refreshToken', refresh_token);
    },

    onError: (error) => {
      console.error('에러메시지: ', error);
    },
  });

  const handleOAuthClick = async () => {
    try {
      await googleLoginMutation.mutateAsync();
      queryClient.invalidateQueries(['googleLogin']);
      handleRedirect();
    } catch (error) {
      alert('Failed to Log In!');
      console.error('Google Log In failed:', error);
    }
    // try {
    //   const response = await axios.post(
    //     'https://8d81-175-123-6-225.ngrok-free.app/oauth2/authorization/google'
    //   );
    //   //   window.location.href = response.headers['location'];
    //   const accessToken = response.headers['access-token'];
    //   const refreshToken = response.headers['refresh-token'];
    //   localStorage.setItem('accessToken', accessToken);
    //   localStorage.setItem('refreshToken', refreshToken);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleRedirect = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');
    if (authorizationCode) {
      googleLoginTokensMutation.mutateAsync(authorizationCode);
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
  margin: 50px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;
