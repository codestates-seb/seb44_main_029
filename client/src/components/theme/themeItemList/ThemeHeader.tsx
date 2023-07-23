import styled from 'styled-components';

interface ThemeHeaderProps {
  currentThemeTitle: string;
}

const ThemeHeader = ({ currentThemeTitle }: ThemeHeaderProps) => {
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
