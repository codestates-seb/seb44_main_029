import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import MainPage from '../pages/MainPage';
import NotFound from '../error/NotFound';
import ThemeImgList from '../pages/ThemeImgList';
import ThemeList from '../pages/ThemeList';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <MainPage /> },
      {
        path: '/theme/:themeId',
        element: <ThemeImgList />,
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
    ],
  },
]);

export default router;
