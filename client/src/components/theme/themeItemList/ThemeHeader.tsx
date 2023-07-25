import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import previousArrowSvg from '../../../assets/icon/icon_previous_arrow.svg';
import nextArrowSvg from '../../../assets/icon/icon_next_arrow.svg';

interface ThemeHeaderProps {
  currentThemeTitle: string;
  themeId: number;
}

const ThemeHeader = ({ currentThemeTitle, themeId }: ThemeHeaderProps) => {
  let description = '';

  // 테마 타이틀에 따라서 설명을 설정
  if (currentThemeTitle === 'Nature') {
    description = '아름다운 자연 풍경';
  } else if (currentThemeTitle === 'Space') {
    description = '우주의 무한함';
  } else if (currentThemeTitle === 'Animal') {
    description = '다양한 동물의 귀여운 매력';
  } else if (currentThemeTitle === 'Pixel') {
    description = '화려한 픽셀 아트의 세계';
  } else if (currentThemeTitle === 'Retro') {
    description = '과거로 돌아가는 레트로 감성';
  }

  const prevThemeId = themeId === 1 ? 5 : themeId - 1;
  const nextThemeId = themeId === 5 ? 1 : themeId + 1;

  return (
    <Container>
      <MoveToPreviousDiv to={`/theme/${prevThemeId}`}>
        <img src={previousArrowSvg} alt="Previous Arrow" />
      </MoveToPreviousDiv>
      <TitleWrapper>
        <h1 className="theme-title">{currentThemeTitle}</h1>
        <p className="theme-description">{description}</p>
      </TitleWrapper>
      <MoveToNextDiv to={`/theme/${nextThemeId}`}>
        <img src={nextArrowSvg} alt="Next Arrow" />
      </MoveToNextDiv>
    </Container>
  );
};

export default ThemeHeader;

const Container = styled.div`
  width: 100%;
  display: flex;
  border-radius: 0.33rem 0.33rem 0 0;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 0.33rem 0.33rem 0 0;

  .theme-title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem 0 1rem;
    color: rgba(255, 255, 255, 1);
  }

  .theme-description {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 2rem;
    color: rgba(255, 255, 255, 0.7);
  }
`;

const MoveToDiv = css`
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  /* position: absolute; */
  opacity: 0.6;
  transition: 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const MoveToPreviousDiv = styled(Link)`
  ${MoveToDiv}
  left: 0;
`;

const MoveToNextDiv = styled(Link)`
  ${MoveToDiv}
  right: 0;
`;
