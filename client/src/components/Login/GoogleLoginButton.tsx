import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';

const GoogleLoginButton: React.FC = () => {
  const handleOAuthClick = async (e: any) => {
    e.preventDefault();
    window.location.href =
      'http://ec2-3-39-72-136.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google';
  };

  return (
    <OAuthButton onClick={handleOAuthClick}>
      <S_FcGoogle />
      Google로 로그인
    </OAuthButton>
  );
};

export default GoogleLoginButton;

const OAuthButton = styled.button`
  width: 300px;
  height: 40px;
  background-color: white;
  border: 1px solid rgb(224, 224, 224);
  cursor: pointer;
  margin: 50px 0 5px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

const S_FcGoogle = styled(FcGoogle)`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;
