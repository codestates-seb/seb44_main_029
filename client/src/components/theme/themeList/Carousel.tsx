import React from 'react';
import styled from 'styled-components';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import imageByIndex from './imageByIndex';

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <EmblaContainer>
      <EmblaViewport ref={emblaRef}>
        <EmblaSlideContainer>
          {slides.map((index) => (
            <EmblaSlide className="embla__slide" key={index}>
              <SlideNumber>
                <SlideNumberText>{index + 1}</SlideNumberText>
              </SlideNumber>
              <EmblaSlideImage
                className="embla__slide__img"
                src={imageByIndex(index)}
                alt="Your alt text"
              />
            </EmblaSlide>
          ))}
        </EmblaSlideContainer>
      </EmblaViewport>
    </EmblaContainer>
  );
};

export default EmblaCarousel;

export const EmblaContainer = styled.div`
  --slide-spacing: 1rem;
  --slide-size: 100%;
  --slide-height: 19rem;
  padding: 1.6rem;
`;

export const EmblaViewport = styled.div`
  overflow: hidden;
`;

export const EmblaSlideContainer = styled.div`
  backface-visibility: hidden;
  display: flex;
  touch-action: pan-y;
  margin-left: calc(var(--slide-spacing) * -1);
`;

export const EmblaSlide = styled.div`
  flex: 0 0 var(--slide-size);
  min-width: 0;
  padding-left: var(--slide-spacing);
  position: relative;
`;

export const EmblaSlideImage = styled.img`
  display: block;
  height: var(--slide-height);
  width: 100%;
  object-fit: cover;
`;

export const SlideNumber = styled.div`
  width: 4.6rem;
  height: 4.6rem;
  z-index: 1;
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  border-radius: 50%;
  background-color: rgba(var(--background-site-rgb-value), 0.85);
  line-height: 4.6rem;
  font-weight: 900;
  text-align: center;
  pointer-events: none;
`;

export const SlideNumberText = styled.span`
  color: var(--brand-primary);
  background-image: linear-gradient(
    45deg,
    var(--brand-primary),
    var(--brand-secondary)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.6rem;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
