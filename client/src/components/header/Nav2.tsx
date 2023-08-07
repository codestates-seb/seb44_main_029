import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logout } from '../../api/api';
import { useMutation } from '@tanstack/react-query';
import { FiAlignJustify } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { setIsClicked, NavState } from '../../feature/header/navSlice';
import { useShowLoginForm } from '../../hooks/useShowLoginForm';

// Nav 컴포넌트
const Nav2 = () => {
  // Redux 스토어로부터 isClicked 상태를 가져옴
  const isClicked = useSelector(
    (state: { nav: NavState }) => state.nav.isClicked
  );
  // // dispatch 함수를 가져옴
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
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
    <Container ref={modalRef}>
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
      <S_FiAlignJustify />
    </Container>
  );
};

export default Nav2;

// 스타일드 컴포넌트 정의
const Container = styled.div`
  z-index: 300;
  display: flex;
  justify-content: center;
  margin-right: 30px;
`;

const NavigateDiv = styled.div`
  height: 100;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.3s ease-in-out;
  margin: 0 20px;
  cursor: pointer;
  &:hover {
    color: rgba(255, 255, 255, 1);
  }
  @media (min-width: 300px) {
    display: none;
  }

  @media (min-width: 1024px) {
    display: block;
  }
`;

const NavBtnDiv = styled.div<{ isClicked: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
  border-radius: 0 0 0 10px;
  transition: transform 0.5s, box-shadow 2s, height 0.5s;
  background-color: ${(props) =>
    props.isClicked && 'rgba(255, 255, 255, 0.6);'};
  @media (min-width: 300px) {
    display: block;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

const S_FiAlignJustify = styled(FiAlignJustify)`
  height: 100%;
  font-size: 30px;
  color: rgba(255, 255, 255, 0.8);
  &:hover {
    color: rgba(255, 255, 255, 1);
  }
  &:active {
  }
  @media (min-width: 300px) {
    display: block;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;
