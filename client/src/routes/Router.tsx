import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import MainPage from '../pages/MainPage';
import NotFound from '../error/NotFound';
import ThemeItemList from '../pages/ThemeItemList';
import ThemeList from '../pages/ThemeList';
import Profile from '../pages/Profile';
import ThemeDetailedItem from '../pages/ThemeDetailedItem';
import Loading from '../components/Login/Loading';
import { checkToken } from '../utils/auth';

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
        loader: checkToken,
      },
      {
        path: '/oauthloading',
        element: <Loading />,
      },
    ],
  },
]);

export default router;
