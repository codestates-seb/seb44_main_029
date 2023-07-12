import styled from 'styled-components';

const EditName = () => {
  return (
    <Container>
      <NameInput />
      <EmailDiv>Email</EmailDiv>
    </Container>
  );
};

export default EditName;

const Container = styled.div``;

const NameInput = styled.input`
  font-size: 32px;
  margin-bottom: 10px;
`;
const EmailDiv = styled.div`
  font-size: 24px;
  color: gray;
`;
