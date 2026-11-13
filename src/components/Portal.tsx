"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";

const noopSubscribe = () => () => {};

/** Renders children into document.body so overlays escape any parent stacking context. */
export function Portal({ children }: { children: ReactNode }) {
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  return mounted ? createPortal(children, document.body) : null;
}
