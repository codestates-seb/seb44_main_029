import React, { useState } from 'react';
import { styled } from 'styled-components';

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [themeId, setThemeId] = useState<string>('1');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile || null);
  };

  const handleThemeIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setThemeId(event.target.value);
  };

  const handleSaveButton = () => {
    if (file) {
      const formdata = new FormData();
      formdata.append('file', file);
      formdata.append('themeId', themeId);

      for (const entry of formdata.entries()) {
        const [key, value] = entry;
        console.log(key, value);
      }
    }
  };

  return (
    <>
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
      <p>{file ? file.name : '파일을 업로드 하세요!'}</p>
      <ThemeSelect value={themeId} onChange={handleThemeIdChange}>
        <option value="1">테마 1</option>
        <option value="2">테마 2</option>
        <option value="3">테마 3</option>
        <option value="4">테마 4</option>
        <option value="5">테마 5</option>
      </ThemeSelect>
      <Button onClick={handleSaveButton}>저장</Button>
    </>
  );
};

export default Upload;

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  height: 200px;
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

const ThemeSelect = styled.select`
  margin-top: 10px;
`;

const Button = styled.button`
  width: 100px;
  height: 40px;
`;
