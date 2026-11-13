export type RoomId = "dreams" | "memories" | "special";

export type Room = {
  id: RoomId;
  label: string;
  tagline: string;
  href: string;
  theme: {
    panel: string;
    frame: string;
    glow: string;
  };
};

export const rooms: Room[] = [
  {
    id: "dreams",
    label: "Your Dreams",
    tagline: "The dream you once told me",
    href: "/gift/dreams",
    theme: {
      panel: "linear-gradient(180deg, #4f46e5 0%, #312e81 60%, #1e1b4b 100%)",
      frame: "#7dd3fc",
      glow: "#7dd3fc",
    },
  },
  {
    id: "memories",
    label: "Memories",
    tagline: "Every moment with you",
    href: "/gift/memories",
    theme: {
      panel: "linear-gradient(180deg, #8b5cf6 0%, #5b21b6 60%, #2e1065 100%)",
      frame: "#c084fc",
      glow: "#c084fc",
    },
  },
  {
    id: "special",
    label: "Special Door",
    tagline: "Something very special",
    href: "/gift/special",
    theme: {
      panel: "linear-gradient(180deg, #d4a017 0%, #92400e 60%, #451a03 100%)",
      frame: "#ffd36e",
      glow: "#ffd36e",
    },
  },
];

/** Rooms that must be opened before the special door unlocks. */
export const SPECIAL_REQUIRES: RoomId[] = ["dreams", "memories"];

export const hall = {
  eyebrow: "Three doors, three surprises",
  title: "Choose a door, Ritu",
  subtitle: "Each one holds something made just for you",
  lockedHint: "This one opens after you visit the other two doors",
  unlockedHint: "The special door is open now...",
};
