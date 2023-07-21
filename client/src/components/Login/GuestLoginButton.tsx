import styled from 'styled-components';
import { TbUserCircle } from 'react-icons/tb';
const GuestLoginButton: React.FC = () => {
  return (
    <GuestButton>
      <S_TbUserCircle />
      Guest로 로그인
    </GuestButton>
  );
};

export default GuestLoginButton;

const GuestButton = styled.button`
  width: 300px;
  height: 40px;
  background-color: white;
  border: 1px solid rgb(224, 224, 224);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 8px;
`;

const S_TbUserCircle = styled(TbUserCircle)`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;
