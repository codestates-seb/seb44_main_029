import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import iconHome from '../../assets/icon/icon_home.png';
import iconUser from '../../assets/icon/icon_user.png';
import iconThemeList from '../../assets/icon/icon_themeList.png';
import iconMenu from '../../assets/icon/icon_menu.png';
import iconLogIn from '../../assets/icon/icon_log.png';
import iconSignUp from '../../assets/icon/icon_Sign.png';
import iconOut from '../../assets/icon/icon_out.png';
import { Logout } from '../../api/api';
import { useMutation } from '@tanstack/react-query';

// Nav 컴포넌트
const Nav = ({
  setIsLogInClicked,
  setIsSignUpClicked,
}: {
  setIsLogInClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSignUpClicked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // 호버 여부 상태 관리
  const [isHovered, setIsHovered] = useState(false);
  const icons = [iconHome, iconUser, iconThemeList];
  const navigate = useNavigate();

  //임시 jwt토큰 유무 판단용
  const accessToken = localStorage.getItem('accessToken');

  // 호버 이벤트 핸들러
  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  const handleNavBtn = (icon: string) => {
    if (icon === iconHome) navigate('/');
    else if (icon === iconUser) navigate('/profile');
    else if (icon === iconThemeList) navigate('/theme');
    else if (icon === iconLogIn) setIsLogInClicked(true);
    else if (icon === iconSignUp) setIsSignUpClicked(true);
  };

  const handleLogoutMutation = useMutation(Logout, {
    onSuccess: () => {
      // 토큰 삭제
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      navigate('/');
    },
    onError: (error) => {
      console.error('Logout failed:', error);
    },
  });

  const handleLogOut = () => {
    const confirmLogout = window.confirm('로그아웃 하시겠습니까?');
    if (confirmLogout) {
      handleLogoutMutation.mutate();
    }
  };
  return (
    <>
      <Container>
        <NavBtnDiv
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
          isHovered={isHovered}
        >
          {/* 마우스 호버시 나타나는 메뉴바 */}
          {isHovered ? (
            <>
              {icons.map((icon) => (
                <NavBtnImg
                  src={icon}
                  isHovered={isHovered}
                  onClick={() => handleNavBtn(icon)}
                />
              ))}
              {/* jwtToken 토큰 유무 분기 */}
              {!accessToken ? (
                <>
                  <NavBtnImg
                    src={iconLogIn}
                    isHovered={isHovered}
                    onClick={() => handleNavBtn(iconLogIn)}
                  ></NavBtnImg>
                  <NavBtnImg
                    src={iconSignUp}
                    isHovered={isHovered}
                    onClick={() => handleNavBtn(iconSignUp)}
                  ></NavBtnImg>
                </>
              ) : (
                <NavBtnImg
                  src={iconOut}
                  isHovered={isHovered}
                  onClick={handleLogOut}
                ></NavBtnImg>
              )}
            </>
          ) : (
            <NavBtnImg src={iconMenu} isHovered={isHovered}></NavBtnImg>
          )}
        </NavBtnDiv>
      </Container>
    </>
  );
};

export default Nav;

// 스타일드 컴포넌트 정의
const Container = styled.div`
  z-index: 99;
`;

const NavBtnDiv = styled.div<{ isHovered: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 7vw;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  transition: transform 0.5s, box-shadow 2s, height 0.5s;
  //transform관련
  height: ${({ isHovered }) => (isHovered ? '350px' : '50px')};
`;

const NavBtnImg = styled.img<{ isHovered: boolean }>`
  width: 20px;
  height: auto;
  border-radius: 5px;
  padding: 7px 0px;
  //transform관련
  transform: ${({ isHovered }) => (isHovered ? 'scale(2)' : 'none')};
  //살짝 둥근 배경효과
  transition: background-color 0.2s, padding 0.2s;
  &:hover {
    padding: 7px;
    background-color: #e3e3e3;
  }
  //클릭 시 색상변화
  &:active {
    padding: 7px 5px;
    background-color: #bbddff;
    transition: background-color 0.05s, padding 0.05s;
  }
`;
