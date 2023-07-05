import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import iconHome from '../../assets/icon/icon_home.png';
import iconUser from '../../assets/icon/icon_user.png';
import iconThemeList from '../../assets/icon/icon_themeList.png';
import iconMenu from '../../assets/icon/icon_menu.png';
import iconLogIn from '../../assets/icon/icon_log.png';
import iconSignUp from '../../assets/icon/icon_Sign.png';

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
  const icons = [iconHome, iconUser, iconThemeList, iconLogIn, iconSignUp];
  const navigate = useNavigate();

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
    //로그인, 회원가입은 추후에~
  };
  return (
    <>
      <Container>
        <NavBtnDiv
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
          isHovered={isHovered}
        >
          {isHovered ? (
            <>
              {icons.map((icon) => (
                <NavBtnImg
                  src={icon}
                  isHovered={isHovered}
                  onClick={() => handleNavBtn(icon)}
                />
              ))}
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
  //사용 임시 중단 ---------------------------------------------
  transform: ${({ isHovered }) =>
    isHovered ? 'translateY(0px) scale(1)' : 'none'};
  //--------------------------------------------------------
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
