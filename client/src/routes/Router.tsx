import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import MainPage from '../pages/MainPage';
import NotFound from '../error/NotFound';
import ThemeImgList from '../pages/ThemeImgList';
import ThemeList from '../pages/ThemeList';
import Profile from '../pages/Profile';

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
    ],
  },
]);

export default router;
