import styled from 'styled-components';
import { useRef } from 'react';

const EditName = ({
  setUserName,
}: {
  setUserName: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const handleNameInputChange = () => {
    const newName = nameInputRef.current?.value;
    if (newName) {
      setUserName(newName);
    }
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
