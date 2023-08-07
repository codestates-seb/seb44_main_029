import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Logout } from '../../api/api';
import { useMutation } from '@tanstack/react-query';
import { FiAlignJustify } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { setIsClicked } from '../../feature/header/navSlice';
import { useShowLoginForm } from '../../hooks/useShowLoginForm';

// Nav 컴포넌트
const Nav2 = () => {
  // // dispatch 함수를 가져옴
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showLoginForm = useShowLoginForm();

  // 세션스토리지에 있는 액세스토큰 꺼내오기
  const accessToken = sessionStorage.getItem('accessToken');

  // 로그아웃 성공 시
  const handleLogoutMutation = useMutation(Logout, {
    onSuccess: () => {
      // 토큰 및 멤버아이디 삭제
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      sessionStorage.removeItem('memberId');
      navigate('/');
    },
    onError: (error) => {
      console.error('Logout failed:', error);
    },
  });

  // 로그아웃 버튼 클릭 시
  const handleLogOut = () => {
    const confirmLogout = window.confirm('로그아웃 하시겠습니까?');
    if (confirmLogout) {
      handleLogoutMutation.mutate();
    }
  };

  // 프로필페이지로 이동하는 버튼 클릭 시
  const handleProfileClick = () => {
    const memberId = sessionStorage.getItem('memberId');
    if (!memberId) {
      alert('로그인이 필요한 기능입니다. 🙏');
    }
    if (!accessToken) {
      showLoginForm();
    } else {
      navigate('/profile');
    }
  };

  return (
    <Container>
      <NavigateDiv onClick={() => navigate('/')}>홈</NavigateDiv>
      <NavigateDiv onClick={() => navigate('/theme')}>
        테마 둘러보기
      </NavigateDiv>
      <NavigateDiv onClick={handleProfileClick}>프로필</NavigateDiv>
      {accessToken ? (
        <NavigateDiv onClick={() => handleLogOut()}>로그아웃</NavigateDiv>
      ) : (
        <NavigateDiv onClick={() => showLoginForm()}>로그인</NavigateDiv>
      )}
    </Container>
  );
};

export default Nav2;

// 스타일드 컴포넌트 정의
const Container = styled.div`
  z-index: 300;
  display: flex;
  justify-content: center;
  align-items: center;

  flex-grow: 1;
  @media (min-width: 300px) {
    margin-right: 0;
    justify-content: center;
  }

  @media (min-width: 768px) {
    margin-right: 50px;
    justify-content: flex-end;
  }
`;

const NavigateDiv = styled.div`
  height: 100;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.2s ease-in-out;
  margin: 0 20px;
  cursor: pointer;
  &:hover {
    color: rgba(255, 255, 255, 1);
    font-weight: bold;
  }
`;
