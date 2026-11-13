import { shotsIn, type Film } from "./film";

const shot = shotsIn("special");

export const papaFilm: Film = {
  title: "A message from Papa",
  titleSub: "Just for you, Ritu",
  spoken: true,
  shots: [
    shot(
      "1-hello",
      "Ritu's father smiling on the sofa under a Happy Birthday Ritu banner",
      "Hello, my dear Ritu",
      "Papa has something to tell you...",
    ),
    shot(
      "2-wave",
      "Ritu's father waving happily at the camera",
      "Happy birthday, my dear daughter!",
      "My heart is so full of joy today",
    ),
    shot(
      "3-cake",
      "Ritu's father holding a chocolate cake that says Happy Birthday Ritu",
      "Make a wish, Ritu",
      "May every single one of them come true",
    ),
    shot(
      "4-heart",
      "Ritu's father with his hand on his heart, smiling tenderly",
      "A part of me is always in you",
      "In your smile, your strength and your kindness",
    ),
    shot(
      "5-blessing",
      "Ritu's father raising his hand to bless her",
      "And I will always be watching over you",
      "My blessings are with you, always",
    ),
    shot(
      "6-papa",
      "Ritu's father sitting at home",
      "Happy birthday, Ritu",
      "With all my love and blessings, Papa",
      { contain: true },
    ),
    shot(
      "7-gift-box",
      "Ritu's father grinning beside an enormous purple gift box, finger on his lips",
      "Oh wait! I almost forgot your gift...",
      "Shh... it's a really big one",
    ),
    shot(
      "8-surprise",
      "Prakash bursting out of the gift box with a gold bow on his head while Ritu's father laughs",
      "Surprise! It's Prakash!",
      "Comes with free hugs, bad jokes and unlimited food dates",
    ),
    shot(
      "9-no-returns",
      "Prakash wearing a gift tag that says For Ritu, No Returns, both giving a thumbs up",
      "Sorry Ritu, no returns, no exchange!",
      "Lifetime warranty included. Please handle with love.",
    ),
  ],
  watchAgain: "Watch again",
};
