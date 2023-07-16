import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import MainPage from '../pages/MainPage';
import NotFound from '../error/NotFound';
import ThemeItemList from '../pages/ThemeItemList';
import ThemeList from '../pages/ThemeList';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import ThemeDetailedItem from '../pages/ThemeDetailedItem';

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
