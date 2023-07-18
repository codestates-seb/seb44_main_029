import backgroundImg1 from '../assets/theme/1.png';
import backgroundImg2 from '../assets/theme/2.png';
import backgroundImg3 from '../assets/theme/3.png';
import backgroundImg4 from '../assets/theme/4.png';
import backgroundImg5 from '../assets/theme/5.png';

const getBackgroundImage = (themeId: string | undefined) => {
  switch (themeId) {
    case '1':
      return backgroundImg1;
    case '2':
      return backgroundImg2;
    case '3':
      return backgroundImg3;
    case '4':
      return backgroundImg4;
    case '5':
      return backgroundImg5;
    default:
      return '';
  }
};

export default getBackgroundImage;
