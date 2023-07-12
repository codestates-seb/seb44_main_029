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
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0 0.5rem;
    color: rgba(255, 255, 255, 1);
  }

  .theme-description {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 1rem;
    color: rgba(255, 255, 255, 0.7);
  }
`;
