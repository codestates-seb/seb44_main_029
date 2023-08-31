import image1 from '../../../assets/theme/1.gif';
import image2 from '../../../assets/theme/2.gif';
import image3 from '../../../assets/theme/3.gif';
import image4 from '../../../assets/theme/4.gif';
import image5 from '../../../assets/theme/5.gif';

export const images: string[] = [image1, image2, image3, image4, image5];

const imageByIndex = (index: number): string => images[index % images.length];

export default imageByIndex;
