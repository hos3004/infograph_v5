export type MutabaatSlide = {
  id: string;
  imageUrl: string | null;
  text: string;
  durationMs?: number;
};

export type MutabaatProps = {
  slides: MutabaatSlide[];
  overlayUrl?: string | null;
  finalOverlayUrl?: string | null;
  bgMusicUrl?: string | null;
  bgMusicVolume?: number;
  textBottomOffset?: number;
  textFontSize?: number;
};

