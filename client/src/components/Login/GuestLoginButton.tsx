import styled from 'styled-components';
import { TbUserCircle } from 'react-icons/tb';
import useLogin from '../../hooks/login/useLogin';
import Swal from 'sweetalert2';

const GuestLoginButton: React.FC = () => {
  const { login } = useLogin();

  const guestButtonClick = async () => {
    try {
      await login({
        email: 'guest@gmail.com',
        password: 'guest123!@#',
      });
      Swal.fire({
        icon: 'success',
        title: '로그인 성공!',
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          window.location.href = '/profile';
        }
      });
    } catch (error) {
      alert('로그인 실패!');
    }
  };

  return (
    <GuestButton onClick={guestButtonClick}>
      <S_TbUserCircle />
      Guest로 로그인
    </GuestButton>
  );
};

export default GuestLoginButton;

const GuestButton = styled.button`
  box-sizing: border-box;
  width: 75%;
  height: 8%;
  background-color: white;
  border: 1px solid rgb(224, 224, 224);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  &:hover {
    background-color: #f1f5f9;
  }
`;

const S_TbUserCircle = styled(TbUserCircle)`
  width: 24px;
  height: 24px;
  margin-right: 10px;
  color: #4b4b4b;
`;
