import styled from 'styled-components';

interface ThemeHeaderProps {
  currentThemeTitle: string;
}

const ThemeHeader = ({ currentThemeTitle }: ThemeHeaderProps) => {
  let description = '';

  // 테마 타이틀에 따라서 설명을 설정
  if (currentThemeTitle === 'Nature') {
    description = '자연 관련 컨텐츠를 감상할 수 있는 테마';
  } else if (currentThemeTitle === 'Space') {
    description = '우주 관련 컨텐츠를 감상할 수 있는 테마';
  } else if (currentThemeTitle === 'Animal') {
    description = 'Animal에 대한 설명';
  } else if (currentThemeTitle === 'Pixel') {
    description = 'Pixel에 대한 설명';
  } else if (currentThemeTitle === 'Retro') {
    description = 'Retro에 대한 설명';
  }

  return (
    <Container>
      <h1 className="theme-title">{currentThemeTitle}</h1>
      <p className="theme-description">{description}</p>
    </Container>
  );
};

export default ThemeHeader;

const Container = styled.div`
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
