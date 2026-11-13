import { shotsIn, type Film } from "./film";

const shot = shotsIn("dream");

export const dream: Film = {
  title: "A day in Ritu's dream",
  titleSub: "A few years from now...",
  shots: [
    shot(
      "1-arrival",
      "Ritu walking into her office past her nameplate, Head of Talent Acquisition",
      "Ritu, Head of Talent Acquisition",
      "Walking into the office she leads",
    ),
    shot(
      "2-meeting",
      "Ritu presenting the hiring plan to her team in a conference room",
      "Leading her own team",
      "Today's plan: finding the perfect people",
    ),
    shot(
      "3-delegate",
      "Ritu handing a folder of work to a team member",
      "Guiding every member of her team",
      "\"I know you'll do this brilliantly\"",
    ),
    shot(
      "4-celebrate",
      "Ritu's team cheering around her after an offer is accepted",
      "Another goal achieved",
      "Her team loves working with her",
    ),
    shot(
      "5-car",
      "Ritu walking to her purple car outside the office at sunset",
      "After a proud day at work...",
      "...she heads to her own car",
    ),
    shot(
      "6-drive",
      "Ritu driving home through the city lights at twilight",
      "The drive home",
      "City lights, a calm heart and a happy smile",
    ),
    shot(
      "7-home",
      "Ritu arriving at her own house with a Ritu's Home nameplate",
      "...to her very own home",
    ),
    shot(
      "8-door",
      "Ritu smiling as she opens the front door of her home",
      "Welcome home, Ritu",
      "Every dream you told me, coming true",
    ),
    shot(
      "9-together",
      "Prakash and Ritu standing together, her head resting on his shoulder",
      "And I'll be right here, beside you",
      "Your dream, your home. I believe in you, always.",
    ),
  ],
  watchAgain: "Watch again",
};
