import { useEffect } from 'react';

type IntersectionObserverCallback = (entry: IntersectionObserverEntry) => void;

interface IntersectionObserverOptions extends IntersectionObserverInit {
  target?: any;
  onIntersect: IntersectionObserverCallback;
}

export const useIntersectionObserver = ({
  root,
  rootMargin,
  threshold,
  target,
  onIntersect,
}: IntersectionObserverOptions) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          onIntersect(entry);
        });
      },
      { root, rootMargin, threshold },
    );

    const currentTarget = target?.current;

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [root, rootMargin, threshold, target, onIntersect]);
};
