import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import { useSelector } from 'react-redux';
import { ModalState } from './feature/header/modalSlice';
import LoginForm from './components/Login/LoginForm';

function App() {
  const isModal = useSelector(
    (state: { modal: ModalState }) => state.modal.isModal
  );
  return (
    <>
      {isModal && <LoginForm />}
      <Header />
      <Outlet />
    </>
  );
}

export default App;
