import { useEffect } from 'react';

interface useIntersectionObserverProps {
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number;
  target: React.RefObject<HTMLElement>;
  onIntersect: (entry: IntersectionObserverEntry) => void;
}

const useIntersectionObserver = ({
  root,
  target,
  onIntersect,
  threshold,
  rootMargin,
}: useIntersectionObserverProps) => {
  useEffect(() => {
    if (!target.current) {
      return;
    }

    const handleObserver: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          onIntersect(entry);
        }
      });
    };

    const options = {
      root,
      rootMargin,
      threshold,
    };

    const observer = new IntersectionObserver(handleObserver, options);

    const targetElement = target?.current;

    observer.observe(targetElement);

    return () => {
      observer.unobserve(targetElement);
    };
  }, [target, root, threshold, rootMargin, onIntersect]);
};

export default useIntersectionObserver;
