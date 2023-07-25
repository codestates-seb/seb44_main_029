import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logout } from '../../api/api';
import { useMutation } from '@tanstack/react-query';
import { FiAlignJustify, FiHome, FiUser, FiX } from 'react-icons/fi';
import { TbCarouselHorizontal, TbLogout, TbLogin } from 'react-icons/tb';
import LoginForm from '../Login/LoginForm';

// Nav 컴포넌트
const Nav = () => {
  const [isClicked, setIsClick] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 외부 영역 클릭 시
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsClick(false);
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [modalRef]);

  // 로컬스토리지에 있는 액세스토큰 꺼내오기
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
      setIsModal(true);
    } else {
      navigate('/profile');
    }
  };

  return (
    <Container ref={modalRef}>
      {isModal && <LoginForm setIsModal={setIsModal} />}
      <NavBtnDiv isClicked={isClicked}>
        {/* 클릭시 나타나는 메뉴바 */}
        {isClicked ? (
          <>
            <StyledIcon>
              <FiX onClick={() => setIsClick(false)} />
            </StyledIcon>
            <StyledIcon>
              <FiHome onClick={() => navigate('/')} />
            </StyledIcon>
            <StyledIcon>
              <FiUser onClick={handleProfileClick} />
            </StyledIcon>
            <StyledIcon>
              <TbCarouselHorizontal onClick={() => navigate('/theme')} />
            </StyledIcon>
            {/* jwtToken 토큰 유무 분기 */}
            {!accessToken ? (
              <StyledIcon>
                <TbLogin onClick={() => setIsModal(true)} />
              </StyledIcon>
            ) : (
              <StyledIcon>
                <TbLogout onClick={handleLogOut} />
              </StyledIcon>
            )}
          </>
        ) : (
          <S_FiAlignJustify onClick={() => setIsClick(true)} />
        )}
      </NavBtnDiv>
    </Container>
  );
};

export default Nav;

// 스타일드 컴포넌트 정의
const Container = styled.div`
  z-index: 300;
`;

const NavBtnDiv = styled.div<{ isClicked: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 70px;
  cursor: pointer;
  border-radius: 0 0 0 10px;
  transition: transform 0.5s, box-shadow 2s, height 0.5s;
  background-color: ${(props) =>
    props.isClicked && 'rgba(255, 255, 255, 0.6);'};
  @media (min-width: 300px) {
    width: 50px;
  }

  @media (min-width: 1024px) {
    width: 70px;
  }
`;

const S_FiAlignJustify = styled(FiAlignJustify)`
  height: auto;
  border-radius: 0 0 0 10px;
  padding: 10px 0px;
  color: white;
  opacity: 0.8;
  //살짝 둥근 배경효과
  transition: background-color 0.2s, padding 0.2s, opacity 0.2s;
  &:hover {
    padding: 10px;
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.8);
  }
  //클릭 시 색상변화
  &:active {
    background-color: #bbddff;
    transition: background-color 0.05s, padding 0.05s;
  }
  @media (min-width: 300px) {
    width: 30px;
  }

  @media (min-width: 1024px) {
    width: 50px;
  }
`;
const StyledIcon = styled.div`
  font-size: 30px;
  height: auto;
  border-radius: 10px 0 0 10px;
  color: white;
  // 살짝 둥근 배경효과
  transition: background-color 0.2s, padding 0.2s;
  @media (min-width: 300px) {
    padding: 15px 0px;
  }

  @media (min-width: 1024px) {
    padding: 20px 0px;
  }

  &:hover {
    padding: 20px;
    background-color: #dbdbdb;
    @media (min-width: 300px) {
      padding: 15px;
    }

    @media (min-width: 1024px) {
      padding: 20px;
    }
  }

  // 클릭 시 색상변화
  &:active {
    background-color: #bbddff;
    transition: background-color 0.05s, padding 0.05s;
  }
  @media (min-width: 300px) {
    font-size: 20px;
  }

  @media (min-width: 1024px) {
    font-size: 30px;
  }
`;
