export type Memory = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  /** CSS object-position for the cropped polaroid thumbnail. */
  focus?: string;
};

export type Chapter = {
  id: string;
  title: string;
  subtitle: string;
  photos: Memory[];
};

const photo = (name: string, width: number, height: number, alt: string, caption: string, focus?: string): Memory => ({
  src: `/media/memories/${name}.jpg`,
  width,
  height,
  alt,
  caption,
  focus,
});

export const memoriesIntro = {
  hint: "Tap any photo to see it up close",
  letterHint: "A letter is waiting for you at the end",
};

export const chapters: Chapter[] = [
  {
    id: "nandi-hills",
    title: "Nandi Hills",
    subtitle: "Up above the clouds, together",
    photos: [
      photo("nandi-hills-1", 1024, 768, "Ritu looking out at the view on Nandi Hills", "Lost in the view (and I was lost in you)", "55% 50%"),
      photo("nandi-hills-4", 576, 1024, "Selfie of us wearing vibes glasses", "Pure vibes only", "50% 40%"),
      photo("nandi-hills-2", 1024, 768, "Ritu with the breeze in her hair", "Breeze in your hair", "50% 50%"),
      photo("nandi-hills-3", 768, 1024, "Our shoes side by side on the grass", "Side by side, always"),
    ],
  },
  {
    id: "food-dates",
    title: "Food dates & city walks",
    subtitle: "Every street tastes better with you",
    photos: [
      photo("kora-food-street-1", 881, 1024, "Selfie at Koramangala food street", "Koramangala food street nights"),
      photo("church-street-pic", 682, 1024, "Painted portrait of us at Church Street", "Church Street, in colour", "50% 40%"),
      photo("thalapakatti-pic", 768, 1024, "Mirror selfie of us hugging", "Biryani and mirror selfies", "50% 30%"),
      photo("kora-food-street-2", 768, 1024, "Smiling selfie of us at night", "Round two at the food street"),
      photo("car-drive-coffee", 576, 1024, "Selfie with I don't care sunglasses", "Coffee, car rides and \"I don't care\"", "50% 40%"),
    ],
  },
  {
    id: "half-saree",
    title: "My half-saree girl",
    subtitle: "Grace in red and gold",
    photos: [
      photo("half-saree-4", 458, 1024, "Ritu smiling in profile in a red half saree", "That smile", "50% 25%"),
      photo("half-saree-1", 507, 1024, "Ritu laughing with her hand over her mouth", "Caught you laughing", "50% 45%"),
      photo("half-saree-3", 459, 1024, "Ritu tying her hair on the rooftop", "Elegance", "50% 30%"),
      photo("half-saree-2", 459, 1024, "Ritu looking at the buildings from the rooftop", "Queen of the rooftop", "50% 40%"),
    ],
  },
  {
    id: "little-moments",
    title: "Little moments",
    subtitle: "The everyday things I treasure most",
    photos: [
      photo("mental-ritu", 768, 1024, "Ritu laughing on a street at night", "My happy, crazy girl", "50% 30%"),
      photo("ipl-lost", 576, 1024, "Black and white selfie of Ritu smiling", "Even an IPL loss can't stop that smile", "50% 55%"),
      photo("ritu-koolam", 1024, 917, "Ritu making a flower pookalam at the office", "Creating something beautiful, as always", "40% 50%"),
      photo("video-call", 471, 1024, "Video call screenshot of Ritu smiling", "Miles apart, still smiling", "50% 45%"),
      photo("vaishali-and-ritu", 768, 1024, "Ritu with Vaishali at work", "With Vaishali at work", "50% 40%"),
    ],
  },
];

export const letter = {
  title: "A letter for you",
  tapToOpen: "Tap to open",
  readAgain: "Read the letter again",
  close: "Close letter",
  greeting: "To my Ritu,",
  paragraphs: [
    "Happy birthday, Ritu! I hope all your dreams and happiness find their way to you. Stay strong, as you always are.",
    "The first time I met you, I thought you were very quiet and that you didn't smile much. But as the months passed, I fell for the adventurous side of you. The way you keep smiling through every situation is one of the most attractive things about you.",
    "I admire your strong character, and the way you stay calm and quiet when things go wrong. I wish that smile, that calm and that strength of yours will always stay by your side.",
    "If God ever asked me for one wish, I am sure I would ask for you to be my wife.",
    "The days we spent at Food Street, Church Street, Jayanagar and Nandi Hills are some of the most memorable days of my life. After I moved to Bangalore, I had never felt this kind of joy and happiness, but you made Bangalore special for me.",
    "I will always pray for you, and I will never forget these memories.",
  ],
  closing: "Forever yours,",
  signature: "Prakash",
  loveLine: "I love you, Ritu",
};
