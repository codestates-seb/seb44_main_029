import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import useEmblaCarousel, {
  EmblaOptionsType,
  EmblaCarouselType,
} from 'embla-carousel-react';
import imageByIndex from './imageByIndex';
import { useNavigate } from 'react-router-dom';
import { DotButton, PrevButton, NextButton } from './CarouselArrowsButton';

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <EmblaContainer>
      <EmblaViewport ref={emblaRef}>
        <EmblaSlideContainer>
          {slides.map((index) => (
            <EmblaSlide className="embla__slide" key={index}>
              <EmblaSlideImage
                className="embla__slide__img"
                src={imageByIndex(index)}
                alt={`is index${index}`}
                onClick={() => navigate(`${index + 1}`)}
              />
            </EmblaSlide>
          ))}
        </EmblaSlideContainer>
      </EmblaViewport>
      <div className="embla__buttons">
        <PrevButton onClick={scrollPrev} disabled={prevBtnDisabled} />
        <NextButton onClick={scrollNext} disabled={nextBtnDisabled} />
      </div>
    </EmblaContainer>
  );
};

export default EmblaCarousel;

export const EmblaContainer = styled.div`
  --slide-spacing: 1rem;
  --slide-size: 100%;
  --slide-height: 60vh;
  --slide-width: 19rem;
  width: 60vw;
`;

export const EmblaViewport = styled.div`
  overflow: hidden;
  border-radius: 20px;
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
  border-radius: 20px;
`;

// export const SlideNumber = styled.div`
//   width: 4.6rem;
//   height: 4.6rem;
//   z-index: 1;
//   position: absolute;
//   top: 0.6rem;
//   right: 0.6rem;
//   border-radius: 50%;
//   background-color: rgba(var(--background-site-rgb-value), 0.85);
//   line-height: 4.6rem;
//   font-weight: 900;
//   text-align: center;
//   pointer-events: none;
// `;

// export const SlideNumberText = styled.span`
//   color: var(--brand-primary);
//   background-image: linear-gradient(
//     45deg,
//     var(--brand-primary),
//     var(--brand-secondary)
//   );
//   background-clip: text;
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   font-size: 1.6rem;
//   display: block;
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
// `;
