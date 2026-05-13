export type SowarTextPreset = 'dark' | 'gold' | 'blue' | 'red' | 'orange';
export type SowarEffect = 'dust' | 'light-leak' | 'bokeh' | 'scanlines' | 'grain' | 'vignette' | 'cinematic-bars';
export type SowarFitMode = 'contain' | 'cover' | 'blurred-background';

export const SOWAR_TEXT_PRESETS: Record<
  SowarTextPreset,
  { bg: string; color: string; border: string }
> = {
  dark: { bg: 'rgba(0,0,0,0.68)', color: '#ffffff', border: 'rgba(255,255,255,0.14)' },
  gold: { bg: 'rgba(160,90,0,0.88)', color: '#fff8e0', border: 'rgba(255,220,80,0.35)' },
  blue: { bg: 'rgba(0,45,130,0.90)', color: '#e8f0ff', border: 'rgba(80,140,255,0.35)' },
  red: { bg: 'rgba(160,10,10,0.88)', color: '#ffe8e8', border: 'rgba(255,80,80,0.35)' },
  orange: { bg: 'rgba(230,90,0,0.95)', color: '#ffffff', border: 'rgba(255,180,60,0.55)' },
};

export type SowarSegment = {
  id: string;
  startMs: number;
  endMs: number;
  label?: string;
};

export type SowarBlurRegion = {
  id: string;
  x: number;
  y: number;
  endX?: number;
  endY?: number;
  width: number;
  height: number;
  blur: number;
  radius?: number;
  feather?: number;
  motionEnabled?: boolean;
  alwaysOn?: boolean;
  startMs?: number;
  endMs?: number;
};

export type SowarProps = {
  mainImageUrl: string | null;
  frameUrl: string | null;
  mainText: string;
  imageScale: number;
  imageX: number;
  imageY: number;
  effects: SowarEffect[];
  textBottomOffset: number;
  textFontSize: number;
  textPreset: SowarTextPreset;
  textAnimationType?: 'motion-blur' | 'typewriter';
  cinematicBarSize?: number;
  bgMusicUrl?: string | null;
  bgMusicVolume?: number;
  fitMode: SowarFitMode;
  blurBackgroundAmount?: number;
  backgroundScale?: number;
  segments: SowarSegment[];
  blurRegions: SowarBlurRegion[];
};
