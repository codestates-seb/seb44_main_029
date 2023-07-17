import styled from 'styled-components';

const Loading = () => {
  if (location.search) {
    const googleAccessToken = new URL(location.href).searchParams.get(
      'authorization'
    );
    const googleRefreshToken = new URL(location.href).searchParams.get(
      'refresh-token'
    );
    const googleMemberId = new URL(location.href).searchParams.get('memberId');

    if (googleAccessToken && googleRefreshToken && googleMemberId) {
      localStorage.setItem('accessToken', googleAccessToken);
      localStorage.setItem('refreshToken', googleRefreshToken);
      localStorage.setItem('memberId', googleMemberId);
      window.location.href = '/';
    }
  }
  return (
    <Div>
      <h1>로딩 중...</h1>
    </Div>
  );
};

export default Loading;

const Div = styled.div`
  margin: 1rem;
  display: flex;
  justify-content: center;
`;
