import React from 'react';
import { AbsoluteFill, Audio, Img, Sequence, Video, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { PersonalitiesCompositionProps } from './types';
import { getSlideDurationMs, msToFrames, buildTimeline, getTotalSlidesDurationMs } from './timeline';

const FPS = 30;

export const PersonalitiesComposition: React.FC<PersonalitiesCompositionProps> = ({
  slides,
  mainVoiceover,
  mainVoiceoverDurationMs,
  voiceover,
  voiceoverDurationMs,
  music,
  musicVolume = 50,
  voiceoverVolume = 100,
  finalDurationMs,
  timelineDurationMs,
  endPage,
  endPageDurationFrames = 0,
}) => {
  const { durationInFrames } = useVideoConfig();

  const timeline = buildTimeline(slides);
  const slidesTotalMs = getTotalSlidesDurationMs(slides);
  const audioMs = mainVoiceoverDurationMs || voiceoverDurationMs || 0;
  const effectiveDurationMs = audioMs > 0 ? audioMs : slidesTotalMs;
  const activeVoiceover = mainVoiceover || voiceover || undefined;

  const extendMs = audioMs > 0 ? Math.max(0, effectiveDurationMs - slidesTotalMs) : 0;
  const lastSlide = slides.length > 0 ? slides[slides.length - 1] : null;
  const endPagePresent = endPage && endPageDurationFrames > 0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000', direction: 'ltr' }}>

      {slides.map((slide, i) => {
        const entry = timeline[i];
        const startFrame = msToFrames(entry.startMs, FPS);
        const durationFrames = msToFrames(entry.durationMs, FPS);
        const isVideo = slide.mediaType === 'video';

        return (
          <Sequence
            key={slide.id}
            from={startFrame}
            durationInFrames={durationFrames}
            layout="none"
          >
            <AbsoluteFill style={{ overflow: 'hidden' }}>
              {isVideo ? (
                <Video
                  src={slide.mediaUrl}
                  muted={slide.isMuted !== false}
                  startFrom={Math.max(0, Math.round(((slide.trimStartMs || 0) / 1000) * FPS))}
                  endAt={slide.trimEndMs != null && slide.trimEndMs > 0 ? Math.max(1, Math.round((slide.trimEndMs / 1000) * FPS)) : undefined}
                  playbackRate={slide.playbackRate || 1}
                  style={{ width: 1920, height: 1080, objectFit: 'cover' }}
                />
              ) : (
                <Img
                  src={slide.mediaUrl}
                  style={{ width: 1920, height: 1080, objectFit: 'cover' }}
                />
              )}
            </AbsoluteFill>
          </Sequence>
        );
      })}

      {extendMs > 0 && lastSlide && (
        <Sequence
          from={msToFrames(slidesTotalMs, FPS)}
          durationInFrames={msToFrames(extendMs, FPS)}
          layout="none"
        >
          <AbsoluteFill style={{ overflow: 'hidden' }}>
            {lastSlide.mediaType === 'video' ? (
              <Video
                src={lastSlide.mediaUrl}
                muted={lastSlide.isMuted !== false}
                startFrom={Math.max(0, Math.round((((lastSlide.trimEndMs || lastSlide.mediaDurationMs || lastSlide.durationMs) - 1000) / 1000) * FPS))}
                endAt={Math.max(1, Math.round(((lastSlide.trimEndMs || lastSlide.mediaDurationMs || lastSlide.durationMs) / 1000) * FPS))}
                style={{ width: 1920, height: 1080, objectFit: 'cover' }}
              />
            ) : (
              <Img
                src={lastSlide.mediaUrl}
                style={{ width: 1920, height: 1080, objectFit: 'cover' }}
              />
            )}
          </AbsoluteFill>
        </Sequence>
      )}

      {endPagePresent && (
        <Sequence
          from={Math.max(0, durationInFrames - endPageDurationFrames)}
          durationInFrames={endPageDurationFrames}
          layout="none"
        >
          <AbsoluteFill style={{ backgroundColor: '#000' }}>
            <Video
              src={endPage}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </AbsoluteFill>
        </Sequence>
      )}

      {activeVoiceover && (
        <Audio
          src={activeVoiceover}
          volume={(typeof voiceoverVolume === 'number' && !isNaN(voiceoverVolume)) ? voiceoverVolume / 100 : 1}
        />
      )}

      {music && (
        <Audio
          src={music}
          loop
          volume={(f) => {
            const fadeStart = Math.max(0, durationInFrames - 45);
            const baseVol = (typeof musicVolume === 'number' && !isNaN(musicVolume)) ? musicVolume / 100 : 0.5;
            if (fadeStart >= durationInFrames) return baseVol;
            return interpolate(f, [fadeStart, durationInFrames], [baseVol, 0], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
            });
          }}
        />
      )}

    </AbsoluteFill>
  );
};
