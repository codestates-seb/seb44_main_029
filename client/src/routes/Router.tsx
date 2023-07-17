import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import MainPage from '../pages/MainPage';
import NotFound from '../error/NotFound';
import ThemeItemList from '../pages/ThemeItemList';
import ThemeList from '../pages/ThemeList';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import Loading from '../components/Login/Loading';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <MainPage /> },
      {
        path: '/theme/:themeId',
        element: <ThemeItemList />,
      },
      {
        path: '/theme',
        element: <ThemeList />,
      },
      {
        path: '/profile',
        element: <Profile />,
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
