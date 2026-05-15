import React from 'react';
import { Composition } from 'remotion';
import { QawalebComposition } from './QawalebComposition';
import type { QawalebProps } from './types';

const defaultProps: QawalebProps = {
  templateId: 'points-broadcast',
  templateValues: {},
  frameUrl: null,
  backgroundImageUrl: null,
  backgroundOpacity: 10,
  backgroundBlur: 12,
  backgroundRadius: 42,
  backgroundFeather: 84,
  parallaxEnabled: true,
  templateColors: {},
  templateScale: 1,
  templateX: 0,
  templateY: 0,
  textFontSize: 65,
  portraitScale: 1,
  portraitX: 0,
  portraitY: 0,
  portraitMonochrome: true,
  portraitSquare: false,
  showQuoteMark: true,
  durationMs: 20000,
  musicUrl: null,
  musicVolume: 0.5,
  voiceoverUrl: null,
  voiceoverVolume: 1,
};

export const QawalebRoot: React.FC = () => {
  return (
    <Composition
      id="QawalebVideo"
      component={QawalebComposition}
      durationInFrames={500}
      fps={25}
      width={1920}
      height={1080}
      defaultProps={defaultProps}
      calculateMetadata={({ props }) => {
        const safeProps = props as QawalebProps;
        const durationInFrames = Math.max(
          25,
          Math.round((Math.max(1000, Number(safeProps.durationMs || 20000)) / 1000) * 25),
        );

        return {
          durationInFrames,
          props: safeProps,
        };
      }}
    />
  );
};
