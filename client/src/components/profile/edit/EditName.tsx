import styled from 'styled-components';

const EditName = () => {
  return (
    <Container>
      <NameInput placeholder="이름을 변경 하세요!" />
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
`;
const EmailDiv = styled.div`
  font-size: 24px;
  color: gray;
`;
