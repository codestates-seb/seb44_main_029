import backgroundImg1 from '../assets/theme/1.png';
import backgroundImg2 from '../assets/theme/2.png';
import backgroundImg3 from '../assets/theme/3.png';
import backgroundImg4 from '../assets/theme/4.png';
import backgroundImg5 from '../assets/theme/5.png';

const getBackgroundImage = (themeId: string | undefined) => {
  switch (themeId) {
    case '1': // Nature
      return backgroundImg1;
    case '2': // Space
      return backgroundImg2;
    case '3': // Animal
      return backgroundImg3;
    case '4': // Pixel
      return backgroundImg4;
    case '5': // Retro
      return backgroundImg5;
    default:
      return '';
  }
};

export default getBackgroundImage;
