import ThemeCarousel from '../components/theme/themeList/ThemeCarousel';
import styled from 'styled-components';
const ThemeList = () => {
  return (
    <Layout>
      <ThemeCarousel />
      <TextContainer />
    </Layout>
  );
};

export default ThemeList;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: gray;
`;

const TextContainer = styled.section`
  width: 100vw;
  height: 20vh;
  border: 1px solid;
`;
