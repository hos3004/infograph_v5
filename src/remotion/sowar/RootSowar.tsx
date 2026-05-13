import React from 'react';
import { Composition } from 'remotion';
import { SowarComposition } from './SowarComposition';
import type { SowarProps } from './types';

const defaultProps: SowarProps = {
  mainImageUrl: null,
  frameUrl: null,
  mainText: '',
  imageScale: 1,
  imageX: 0,
  imageY: 0,
  effects: [],
  textBottomOffset: 160,
  textFontSize: 46,
  textPreset: 'dark',
  textAnimationType: 'motion-blur',
  cinematicBarSize: 6,
  bgMusicUrl: null,
  bgMusicVolume: 0.25,
  fitMode: 'blurred-background',
  blurBackgroundAmount: 36,
  backgroundScale: 1.18,
  segments: [
    { id: 'segment-1', startMs: 0, endMs: 10000, label: 'مقطع 1' },
  ],
  blurRegions: [],
};

export const SowarRoot: React.FC = () => (
  <>
    <Composition
      id="SowarVideo"
      component={SowarComposition}
      durationInFrames={300}
      fps={25}
      width={1920}
      height={1080}
      defaultProps={defaultProps}
      calculateMetadata={({ props }) => {
        const p = props as SowarProps;
        const totalFrames = (Array.isArray(p.segments) ? p.segments : [])
          .map((segment) => Math.max(1, Math.round(((segment.endMs - segment.startMs) / 1000) * 25)))
          .reduce((sum, frames) => sum + frames, 0);

        return {
          durationInFrames: Math.max(25, totalFrames || 25),
          props: p,
        };
      }}
    />
  </>
);
