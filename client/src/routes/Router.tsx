import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import MainPage from '../pages/MainPage';
import NotFound from '../error/NotFound';
import ThemeItemList from '../pages/ThemeItemList';
import ThemeList from '../pages/ThemeList';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import ThemeDetailedItem from '../pages/ThemeDetailedItem';
import Loading from '../components/Login/Loading';

// 인증 상태를 확인 후 인증된 경우 : Profile
// 인증되지 않은 경우 : LoginForm
const renderBasedOnAuthStatus = () => {
  const isAuthenticated = localStorage.getItem('accessToken');
  const isLoggedIn = isAuthenticated && isAuthenticated !== 'null';
  return isLoggedIn ? <Profile /> : <MainPage />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <MainPage /> },
      {
        path: '/theme',
        element: <ThemeList />,
      },
      {
        path: '/theme/:themeId',
        element: <ThemeItemList />,
      },
      {
        path: '/theme/:themeId/:contentId',
        element: <ThemeDetailedItem />,
      },
      {
        path: '/profile',
        element: renderBasedOnAuthStatus(),
      },
      {
        path: '/profile/edit',
        element: <ProfileEdit />,
      },
      {
        path: '/oauthloading',
        element: <Loading />,
      },
    ],
  },
]);

export default router;
