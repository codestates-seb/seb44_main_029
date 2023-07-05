import styled from 'styled-components';

const ThemeHeader = () => {
  return (
    <Container>
      <h1 className="theme-title">Theme Title</h1>
      <p className="theme-description">Theme Description</p>
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
    margin: 2rem 3rem 0;
    color: rgba(255, 255, 255, 1);
  }

  .theme-description {
    margin: 1rem 3rem 2rem;
    color: rgba(255, 255, 255, 0.7);
  }
`;
