import { useEffect } from 'react';

interface useIntersectionObserverProps {
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number;
  target: React.RefObject<HTMLElement>;
  onIntersect: (entry: IntersectionObserverEntry) => void;
  enabled: boolean;
}

const useIntersectionObserver = ({
  root,
  target,
  onIntersect,
  threshold = 0.3,
  rootMargin = '0px',
  enabled = true,
}: useIntersectionObserverProps) => {
  useEffect(() => {
    if (!enabled || !target.current) {
      return;
    }

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(onIntersect);
    };

    const observer = new IntersectionObserver(handleObserver, {
      root: root || null,
      rootMargin,
      threshold,
    });

    const el = target && target.current;

    if (!el) {
      return;
    }

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [target, enabled, root, threshold, rootMargin, onIntersect]);
};

export default useIntersectionObserver;
