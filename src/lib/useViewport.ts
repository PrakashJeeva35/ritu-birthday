import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}

export function useViewport() {
  const width = useSyncExternalStore(
    subscribe,
    () => window.innerWidth,
    () => 0,
  );
  const height = useSyncExternalStore(
    subscribe,
    () => window.innerHeight,
    () => 0,
  );
  return { width, height };
}
