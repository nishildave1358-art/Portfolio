import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

export function useIsMobile(): boolean {
  return useMediaQuery(`(max-width: 768px)`);
}

export function useIsTablet(): boolean {
  return useMediaQuery(`(min-width: 769px) and (max-width: 1024px)`);
}

export function useIsDesktop(): boolean {
  return useMediaQuery(`(min-width: 1025px)`);
}
