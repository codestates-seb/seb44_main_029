import styled from 'styled-components';

const ImgList = () => {
  return (
    <Container>
      <CatImg src="https://i.pinimg.com/236x/91/75/31/9175319b09ac93cd30acd3763c44d1f3.jpg" />
      <CatImg src="https://dorriez.com/wp-content/uploads/2023/05/img-12.jpg" />
      <CatImg src="https://blog.kakaocdn.net/dn/yDtgP/btrJaVA4iLN/9QtVWLrCIrUtDz7U4Udsr0/img.jpg" />
      <CatImg src="https://i.pinimg.com/originals/8c/fe/55/8cfe55a7e420f5118f6796e74b2b691a.jpg" />
      <CatImg src="https://post-phinf.pstatic.net/MjAyMjExMTdfNzYg/MDAxNjY4NjUwMTQxMzU2.KOS5Iab6G0-88otScR2vsaZmoimqN8v-b5QiMhSkj5og.qsrQszwww-AZFP32Vs0gfJpqYp4tWpaXQYRupweSlOMg.JPEG/1633c62db4f2af416b327f14ce3c3100.jpg?type=w800_q75" />
    </Container>
  );
};

export default ImgList;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border: 1px dotted white;
`;

const CatImg = styled.img`
  margin: 30px;
  width: 150px;
  height: 150px;
  border-radius: 10px;
  object-fit: cover;
  transition: scale 0.3s;
  &:hover {
    scale: 1.1;
  }
`;
