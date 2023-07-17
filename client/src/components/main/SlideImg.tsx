import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import img1 from '../../assets/theme/1.png';
import img2 from '../../assets/theme/2.png';
import img3 from '../../assets/theme/3.png';
import img4 from '../../assets/theme/4.png';
import img5 from '../../assets/theme/5.png';

const SlideImg = React.memo(() => {
  const imgs = [img1, img2, img3, img4, img5];
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImgIndex((prevIndex) => (prevIndex + 1) % imgs.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [imgs]);

  return (
    <Container>
      {imgs.map((img, index) => (
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
