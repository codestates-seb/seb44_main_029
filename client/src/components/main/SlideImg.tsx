import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import gif1 from '../../assets/theme/1.gif';
import gif2 from '../../assets/theme/2.gif';
import gif3 from '../../assets/theme/3.gif';
import gif4 from '../../assets/theme/4.gif';
import gif5 from '../../assets/theme/5.gif';

const SlideImg = React.memo(() => {
  const gifs = [gif1, gif2, gif3, gif4, gif5];
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImgIndex((prevIndex) => (prevIndex + 1) % gifs.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [gifs]);

  return (
    <Container>
      {gifs.map((img, index) => (
        <Image
          key={index}
          src={img}
          alt="Slide Image"
          isActive={index === currentImgIndex}
        />
      ))}
    </Container>
  );
});

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Image = styled.img<{ isActive: boolean }>`
  -webkit-user-drag: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  border-radius: 20px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5);
`;
export default SlideImg;
