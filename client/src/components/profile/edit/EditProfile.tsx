import styled from 'styled-components';
import EditImg from './EditImg';
import EditName from './EditName';
import { useMutation } from '@tanstack/react-query';
import { PetchEditProfile } from '../../../api/api';
import { setIsEdit, EditState } from '../../../feature/profile/editSlice';
import { useDispatch, useSelector } from 'react-redux';

const EditProfile = ({}) => {
  const dispatch = useDispatch();
  const imgUrl = useSelector((state: { edit: EditState }) => state.edit.imgUrl);
  const userName = useSelector(
    (state: { edit: EditState }) => state.edit.userName
  );
  const noChangeUserName = useSelector(
    (state: { edit: EditState }) => state.edit.noChangeUserName
  );

  //취소버튼
  const handleCancleButton = () => {
    dispatch(setIsEdit(false));
  };
  //저장버튼
  const handleSaveButton = async () => {
    const confirmed = window.confirm('정말 저장하시겠습니까?');
    if (confirmed) {
      //  editMutation을 비동기로 실행
      const response = await editMutation.mutateAsync();
      if (response.status === 200) {
        dispatch(setIsEdit(false));
      } else if (response.status === 202 && response.data === -2) {
        alert('이미 사용중인 유저네임입니다.');
      }
    }
  };

  const editMutation = useMutation(() =>
    PetchEditProfile({
      imageUrl: imgUrl,
      username: userName || noChangeUserName,
    })
  );

  return (
    <Container>
      <EditInfoDiv>
        <EditImg />
        <EditName />
        <BtnGroupDiv>
          <Button bgColor="#3690f0" onClick={handleSaveButton}>
            저장
          </Button>
          <Button bgColor="#f73737" onClick={handleCancleButton}>
            취소
          </Button>
        </BtnGroupDiv>
      </EditInfoDiv>
    </Container>
  );
};

export default EditProfile;

const Container = styled.div`
  width: 100%;
  padding: 1.5rem;
  box-sizing: border-box;
  margin: 1.5rem, 0;
`;

const EditInfoDiv = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-radius: 1rem;
  padding: 1.5rem;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BtnGroupDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
  width: 100%;
`;

const Button = styled.button<{ bgColor: string }>`
  color: white;
  background-color: ${(props) => props.bgColor || '#59a395'};
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-left: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 20px;

  font-size: 1px;
  width: 40px;

  @media (min-width: 400px) {
    font-size: 4px;
    width: 80px;
  }

  @media (min-width: 500px) {
    font-size: 6px;
    width: 100px;
  }
  @media (min-width: 768px) {
    font-size: 12px;
    width: 140px;
  }
`;
