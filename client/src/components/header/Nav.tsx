import styled from 'styled-components';
import { useState } from 'react';
import iconHome from '../../assets/icon/icon_home.png';
import iconUser from '../../assets/icon/icon_user.png';
import iconThemeList from '../../assets/icon/icon_themeList.png';
import iconMenu from '../../assets/icon/icon_menu.png';
import iconLogIn from '../../assets/icon/icon_log.png';
import iconSignUp from '../../assets/icon/icon_Sign.png';

// Nav 컴포넌트
const Nav = () => {
  // 호버 여부 상태 관리
  const [isHovered, setIsHovered] = useState(false);
  const icons = [iconHome, iconUser, iconThemeList, iconLogIn, iconSignUp];

  // 호버 이벤트 핸들러
  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <Container>
      <NavBtnDiv
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        isHovered={isHovered}
      >
        {isHovered ? (
          <>
            {icons.map((icon) => (
              <NavBtnImg src={icon} isHovered={isHovered} />
            ))}
          </>
        ) : (
          <NavBtnImg src={iconMenu} isHovered={isHovered}></NavBtnImg>
        )}
      </NavBtnDiv>
    </Container>
  );
};

export default Nav;

// 스타일드 컴포넌트 정의
const Container = styled.div`
  z-index: 99;
  margin-right: 30px;
`;

const NavBtnDiv = styled.div<{ isHovered: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  transition: transform 0.5s, box-shadow 0.3s, height 0.5s;
  //transform관련
  height: ${({ isHovered }) => (isHovered ? '300px' : '50px')};
  transform: ${({ isHovered }) =>
    isHovered ? 'translateY(130px) scale(1)' : 'none'};
  box-shadow: ${({ isHovered }) =>
    isHovered ? '5px 5px 10px rgba(255, 255, 255, 0.2)' : 'none'};
`;

const NavBtnImg = styled.img<{ isHovered: boolean }>`
  width: 20px;
  height: auto;
  transition: padding 0.5s;
  //transform관련
  transform: ${({ isHovered }) => (isHovered ? 'scale(2)' : 'none')};
  //살짝 둥근 배경효과
  &:hover {
    border-radius: 5px;
    padding: 5px;
    background-color: #e3e3e3;
  }
  transition: background-color 0.2s, padding 0.2s;
  &:active {
    padding: 4px;
    background-color: #b3d8ff;
  }
`;
