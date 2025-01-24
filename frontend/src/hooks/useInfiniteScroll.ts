import { useEffect, useCallback } from 'react';

export const useInfiniteScroll = (
  callback: () => void,
  element: HTMLElement | null,
  hasMore: boolean
) => {
  const handleScroll = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore) {
        callback();
      }
    },
    [callback, hasMore]
  );

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(handleScroll, {
      root: null,
      threshold: 1.0,
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [handleScroll, element]);
};