import styled from 'styled-components';
import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GetUserInfo } from '../../../api/api';

const EditName = ({
  userName,
  setUserName,
  changeUserName,
  setChangeUserName,
}: {
  userName: string | null;
  changeUserName: string | null;
  setUserName: React.Dispatch<React.SetStateAction<string | null>>;
  setChangeUserName: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const { data } = useQuery(['userInfo'], GetUserInfo);
  const email = data?.email;
  const username = data?.username;
  //useRef로 현재 input값 받아오기
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  // input값에 따라 인자에 들어갈 값을 변경하는 핸들러
  const handleNameInputChange = () => {
    const newName = nameInputRef.current?.value;
    if (newName) setUserName(newName);
    else if (newName === '') setUserName(null);
  };
  return (
    <Container>
      <InputWrapper>
        <NameInput
          ref={nameInputRef}
          placeholder={username || ''}
          onChange={handleNameInputChange}
        />
      </InputWrapper>

      <EmailDiv>{email}</EmailDiv>
    </Container>
  );
};

export default EditName;

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
`;

const InputWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
`;

const NameInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 10px;
  font-size: 16px;
  color: black;
  height: 21px;

  @media (min-width: 300px) {
    font-size: 24px;
    height: 32px;
  }
  @media (min-width: 500px) {
    font-size: 28px;
    height: 37px;
  }
  @media (min-width: 768px) {
    font-size: 32px;
    height: 43px;
  }
`;
const EmailDiv = styled.div`
  box-sizing: border-box;
  width: 100%;
  color: gray;
  font-size: 8px;
  @media (min-width: 300px) {
    font-size: 10px;
  }
  @media (min-width: 500px) {
    font-size: 14px;
  }
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;
