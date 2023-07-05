import styled from 'styled-components';
import backgroundImg from '../assets/images/mainPage_background.jpg';
import Title from '../components/main/Title';
const MainPage = () => {
  return (
    <Layout>
      <Title />
    </Layout>
  );
};

export default MainPage;

const Layout = styled.div`
  max-width: 100%;
  width: 100vw;
  height: 100vh;
  padding: 0;
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;
