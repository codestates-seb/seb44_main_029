import styled from 'styled-components';

const EditName = () => {
  return (
    <Container>
      <NameInput placeholder="New Name!" />
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
