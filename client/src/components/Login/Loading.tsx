import styled, { keyframes } from 'styled-components';

const Loading = () => {
  const saveTokenToLocalStorage = (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(
        `토큰 "${key}"을(를) 로컬 스토리지에 저장하는 중 오류가 발생했습니다:`,
        error
      );
    }
  };

  const googleAccessToken = new URL(location.href).searchParams.get(
    'authorization'
  );
  const googleRefreshToken = new URL(location.href).searchParams.get(
    'refresh-token'
  );
  const googleMemberId = new URL(location.href).searchParams.get('memberId');

  if (googleAccessToken && googleRefreshToken && googleMemberId) {
    saveTokenToLocalStorage('accessToken', googleAccessToken);
    saveTokenToLocalStorage('refreshToken', googleRefreshToken);
    saveTokenToLocalStorage('memberId', googleMemberId);
  } else {
    console.error('토큰이 누락되었습니다: accessToken, refreshToken, memberId');
  }

  window.location.href = '/';
  return (
    <Container>
      <Loader />
      <LoadingText>구글 로그인중입니다...</LoadingText>
    </Container>
  );
};

export default Loading;

const Container = styled.div`
  margin: 1rem;
  display: flex;

  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  margin: 0;

  background-color: #a8a8a8;
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 4px solid #ffffff;
  border-top-color: transparent;
  animation: ${spin} 0.8s linear infinite;
`;

const LoadingText = styled.h1`
  margin-top: 1rem;
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
`;
