import React from 'react';
import { Composition } from 'remotion';
import { MutabaatComposition, getMutabaatTotalFrames } from './MutabaatComposition';
import type { MutabaatProps } from './types';

const defaultProps: MutabaatProps = {
  slides: [
    {
      id: 'slide-1',
      imageUrl: null,
      text: 'عنوان المتابعة++تفاصيل الخبر',
      durationMs: 20000,
    },
  ],
  overlayUrl: null,
  finalOverlayUrl: null,
  bgMusicUrl: null,
  bgMusicVolume: 0.35,
  textBottomOffset: 130,
  textFontSize: 54,
};

export const MutabaatRoot: React.FC = () => (
  <Composition
    id="MutabaatVideo"
    component={MutabaatComposition}
    durationInFrames={500}
    fps={25}
    width={1920}
    height={1080}
    defaultProps={defaultProps}
    calculateMetadata={({ props }) => {
      const p = props as MutabaatProps;
      return {
        durationInFrames: getMutabaatTotalFrames(p.slides),
        props: p,
      };
    }}
  />
);

