import styled from 'styled-components';
import { useRef } from 'react';

const EditName = ({
  setUserName,
}: {
  setUserName: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
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
      <NameInput
        ref={nameInputRef}
        placeholder="New Name!"
        onChange={handleNameInputChange}
      />
      <EmailDiv>Email</EmailDiv>
    </Container>
  );
};

export default EditName;

const Container = styled.div`
  flex-grow: 1;
`;

const NameInput = styled.input`
  font-size: 32px;
  margin-bottom: 10px;
  outline: none;
  border: none;
`;
const EmailDiv = styled.div`
  font-size: 24px;
  color: gray;
`;
