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
  background-color: rgba(0, 0, 0, 0.88);
  border-radius: 0.5rem 0.5rem 0 0;

  .theme-title {
    margin: 2rem 2rem 0;
    color: rgba(255, 255, 255, 1);
  }

  .theme-description {
    margin: 0.5rem 2rem;
    color: rgba(255, 255, 255, 0.7);
  }
`;
