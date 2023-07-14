import React, { useState } from 'react';
import { styled } from 'styled-components';

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [themeId, setThemeId] = useState<string>('1');

  //파일 등록 감지 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile || null);
  };

  //테마 아이디 변경 핸들러
  const handleThemeIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setThemeId(event.target.value);
  };

  //저장 버튼 API실행
  const handleSaveButton = () => {
    if (file && window.confirm('정말 저장하시겠습니까?')) {
      const formdata = new FormData();
      formdata.append('file', file);
      formdata.append('themeId', themeId);

      for (const entry of formdata.entries()) {
        const [key, value] = entry;
        console.log(key, value);
      }
    }
  };
  //취소 버튼
  const handleCancelButton = () => {
    setFile(null);
  };

  return (
    <Container>
      <SelectDiv>
        {' '}
        <p>{file ? file.name : '파일을 업로드 하세요!'}</p>
        <ThemeSelect value={themeId} onChange={handleThemeIdChange}>
          {Array.from({ length: 5 }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              테마 {index + 1}
            </option>
          ))}
        </ThemeSelect>
      </SelectDiv>

      <Label>
        <Input
          type="file"
          id="file"
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png,.gif,.mp3"
        />
        {file ? (
          <>
            {file.type.startsWith('image/') && (
              <img src={URL.createObjectURL(file)} alt="Image Preview" />
            )}
            {file.type.startsWith('audio/') && (
              <audio src={URL.createObjectURL(file)} controls />
            )}
          </>
        ) : (
          <p>Click me!</p>
        )}
      </Label>
      <SelectDiv>
        <Button color="#007bff" onClick={handleSaveButton}>
          저장
        </Button>
        <Button color="#ff0000" onClick={handleCancelButton}>
          취소
        </Button>
      </SelectDiv>
    </Container>
  );
};

export default Upload;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  height: 250px;
  width: 300px;
  border: 2px dashed black;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  &:hover {
    color: green;
    border-color: green;
  }

  > img {
    width: 99%;
    height: 99%;
    object-fit: cover;
    border-radius: 10px;
  }
`;
const SelectDiv = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
  justify-content: space-between;
  align-items: center;
`;

const ThemeSelect = styled.select`
  height: 30px;
  font-size: 15px;
`;

const Button = styled.button`
  width: 130px;
  height: 40px;
  font-size: 17px;
  border-radius: 10px;
  color: white;
  background-color: ${(props) => props.color};
`;
