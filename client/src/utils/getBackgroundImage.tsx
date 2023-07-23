import backgroundGif1 from '../assets/theme/1.gif';
import backgroundGif2 from '../assets/theme/2.gif';
import backgroundGif3 from '../assets/theme/3.gif';
import backgroundGif4 from '../assets/theme/4.gif';
import backgroundGif5 from '../assets/theme/5.gif';

const getBackgroundImage = (themeId: string | undefined) => {
  switch (themeId) {
    case '1': // Nature
      return backgroundGif1;
    case '2': // Space
      return backgroundGif2;
    case '3': // Animal
      return backgroundGif3;
    case '4': // Pixel
      return backgroundGif4;
    case '5': // Retro
      return backgroundGif5;
    default:
      return '';
  }
};

export default getBackgroundImage;
