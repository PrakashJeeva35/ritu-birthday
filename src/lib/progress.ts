import { useMemo, useSyncExternalStore } from "react";
import type { RoomId } from "@/content/rooms";

export type ProgressFlag = RoomId | "special-unlock-seen";

const STORAGE_KEY = "ritu-gift-progress";
const CHANGE_EVENT = "ritu-gift-progress-change";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function readRaw() {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function parse(raw: string): ProgressFlag[] {
  try {
    const value = JSON.parse(raw);
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function write(flags: ProgressFlag[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flags));
  } catch {
    return;
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function addProgress(flag: ProgressFlag) {
  const flags = parse(readRaw());
  if (!flags.includes(flag)) write([...flags, flag]);
}

export function resetProgress() {
  write([]);
}

export function useProgress() {
  const raw = useSyncExternalStore(subscribe, readRaw, () => "[]");
  return useMemo(() => new Set(parse(raw)), [raw]);
}
