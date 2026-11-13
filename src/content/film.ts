export type FilmShot = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  subtitle?: string;
  /** Show the whole image over a blurred copy of itself, for photos that aren't 16:9. */
  contain?: boolean;
};

export type Film = {
  title: string;
  titleSub: string;
  shots: FilmShot[];
  watchAgain: string;
  /** Captions are someone speaking: words appear one at a time. */
  spoken?: boolean;
};

/** Builds shots whose image lives at `/media/<folder>/<id>.jpg`. */
export const shotsIn =
  (folder: string) =>
  (id: string, alt: string, caption: string, subtitle?: string, extra?: Pick<FilmShot, "contain">): FilmShot => ({
    id,
    src: `/media/${folder}/${id}.jpg`,
    alt,
    caption,
    subtitle,
    ...extra,
  });
