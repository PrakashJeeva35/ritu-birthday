export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export const site = {
  name: "Ritu",
  /** Cut so the chorus drop lands on the moon blast, 7 s after "Tap to begin". */
  music: "/media/music/kesariya-chorus.m4a",
  /** Rooms with their own background track; it starts automatically when the room opens. */
  roomMusic: {
    "/gift/dreams": "/media/music/le-jaye-instr.mp3",
    "/gift/memories": "/media/music/pachai-nirame.m4a",
  } as Record<string, string>,
  startEyebrow: "Especially for Ritu",
  startPrompt: "A little surprise is waiting for you",
  startButton: "Tap to begin",
  soundHint: "Best with your sound on",
  titleEyebrow: "Today the stars are celebrating",
  wishHint: "Make a wish, Ritu...",
  homeMessage: "Made with love, just for you",
  unlockGift: "Unlock your gift",
  homePhotos: {
    center: {
      src: "/media/ritu/most-fav.jpg",
      width: 1024,
      height: 1002,
      alt: "Ritu smiling softly, looking down",
    },
    left: {
      src: "/media/ritu/fav-1.jpg",
      width: 852,
      height: 1024,
      alt: "Ritu smiling on a garden path",
    },
    right: {
      src: "/media/ritu/fav-2.jpg",
      width: 831,
      height: 1024,
      alt: "Ritu sitting by a wooden pillar among the trees",
    },
  } satisfies Record<string, Photo>,
};
