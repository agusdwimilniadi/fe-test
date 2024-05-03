import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import UserPost from './pages/UserPost';
import Album from './pages/Album';
import DetailAlbum from './pages/Album/DetailAlbum';
import DetailPost from './pages/UserPost/DetailPost';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/post/:id',
    element: <UserPost />,
  },
  {
    path: '/post/detail/:id',
    element: <DetailPost />,
  },
  {
    path: '/album/:id',
    element: <Album />,
  },
  {
    path: '/album/detail/:id',
    element: <DetailAlbum />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
export default function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />;
    </>
  );
}
