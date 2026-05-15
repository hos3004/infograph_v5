import React from 'react';
import { AbsoluteFill, Img, OffthreadVideo, Video } from 'remotion';
import { QawalebAudioTracks, QawalebTemplateRenderer } from './QawalebTemplates';
import type { QawalebProps } from './types';

type AdaptiveVideoProps = React.ComponentProps<typeof Video>;

const AdaptiveVideo: React.FC<AdaptiveVideoProps> = (props) => {
  const usesRemoteSource = /^https?:\/\//i.test(props.src || '');
  if (usesRemoteSource) {
    return <Video {...props} />;
  }

  return <OffthreadVideo {...(props as React.ComponentProps<typeof OffthreadVideo>)} />;
};

export const QawalebComposition: React.FC<QawalebProps> = ({
  templateId,
  templateValues,
  frameUrl,
  backgroundImageUrl,
  backgroundOpacity = 10,
  backgroundBlur = 12,
  backgroundRadius = 42,
  backgroundFeather = 84,
  parallaxEnabled = true,
  templateColors,
  templateScale = 1,
  templateX = 0,
  templateY = 0,
  textFontSize = 65,
  portraitScale = 1,
  portraitX = 0,
  portraitY = 0,
  portraitMonochrome = true,
  portraitSquare = false,
  showQuoteMark = true,
  musicUrl,
  musicVolume = 0.5,
  voiceoverUrl,
  voiceoverVolume = 1,
}) => {
  const isImageFrame = frameUrl ? /\.(png|gif|jpg|jpeg|webp)$/i.test(frameUrl) : false;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      <QawalebAudioTracks
        musicUrl={musicUrl}
        musicVolume={musicVolume}
        voiceoverUrl={voiceoverUrl}
        voiceoverVolume={voiceoverVolume}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translate(${templateX}px, ${templateY}px) scale(${templateScale})`,
          transformOrigin: 'center center',
        }}
      >
        <QawalebTemplateRenderer
          templateId={templateId}
          values={templateValues || {}}
          appearance={{
            fontScale: Math.max(0.55, Number(textFontSize || 65) / 65),
            colors: templateColors || {},
            backgroundImageUrl,
            backgroundOpacity,
            backgroundBlur,
            backgroundRadius,
            backgroundFeather,
            parallaxEnabled,
            portraitScale: Math.max(0.6, Number(portraitScale || 1)),
            portraitX: Number(portraitX || 0),
            portraitY: Number(portraitY || 0),
            portraitMonochrome: portraitMonochrome !== false,
            portraitSquare: portraitSquare === true,
            showQuoteMark: showQuoteMark !== false,
          }}
        />
      </div>
      {frameUrl ? (
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
          {isImageFrame ? (
            <Img src={frameUrl} style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
          ) : (
            <AdaptiveVideo src={frameUrl} muted style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
          )}
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
