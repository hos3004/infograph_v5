import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  OffthreadVideo,
  Sequence,
  Video,
  getRemotionEnvironment,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import type { MutabaatProps, MutabaatSlide } from './types';

const FPS = 25;
const DEFAULT_SLIDE_MS = 15000;
const FINAL_SLIDE_MS = 20000;
const FONT_FAMILY = 'AvenirArabic';
const IS_PLAYER = getRemotionEnvironment().isPlayer;

if (typeof document !== 'undefined' && !document.head.querySelector('[data-font="AvenirArabic-Mutabaat"]')) {
  const fontUrl = staticFile('assets/fonts/alfont_com_AlFont_com_AvenirArabic-Heavy.otf');
  const style = document.createElement('style');
  style.setAttribute('data-font', 'AvenirArabic-Mutabaat');
  style.textContent = `
    @font-face {
      font-family: '${FONT_FAMILY}';
      src: url('${fontUrl}') format('opentype');
      font-weight: bold;
      font-style: normal;
      font-display: block;
    }
  `;
  document.head.appendChild(style);
}

const DEFAULT_OVERLAY = staticFile('assets/mutabaat/slide.webm');
const DEFAULT_FINAL_OVERLAY = staticFile('assets/mutabaat/final-slide.webm');
const DEFAULT_MUSIC = staticFile('assets/mutabaat/news-clock-intense-loop.wav');

const isRTL = (text: string) => /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(text);

const VideoLayer: React.FC<React.ComponentProps<typeof Video>> = (props) => {
  if (!props.src) return null;
  if (IS_PLAYER) return <Video {...props} />;
  return <OffthreadVideo {...(props as React.ComponentProps<typeof OffthreadVideo>)} />;
};

export function getMutabaatSlideDurationMs(index: number, total: number, value?: number) {
  if (Number.isFinite(value) && Number(value) > 0) return Number(value);
  return index === total - 1 ? FINAL_SLIDE_MS : DEFAULT_SLIDE_MS;
}

export function getMutabaatTotalFrames(slides: MutabaatSlide[]) {
  const totalMs = (Array.isArray(slides) ? slides : []).reduce(
    (sum, slide, index, all) => sum + getMutabaatSlideDurationMs(index, all.length, slide.durationMs),
    0,
  );
  return Math.max(FPS, Math.round((totalMs / 1000) * FPS));
}

const SlideText: React.FC<{
  text: string;
  bottomOffset: number;
  fontSize: number;
}> = ({ text, bottomOffset, fontSize }) => {
  const frame = useCurrentFrame();
  const lines = text.split('++').map((line) => line.trim()).filter(Boolean);
  if (lines.length === 0) return null;

  const wrapperOpacity = interpolate(frame, [4, 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(frame, [4, 18], [34, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <>
      <AbsoluteFill
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0) 46%)',
          opacity: wrapperOpacity,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 120,
          bottom: bottomOffset,
          maxWidth: 1280,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 14,
          opacity: wrapperOpacity,
          transform: `translateY(${y}px)`,
        }}
      >
        {lines.map((line, index) => {
          const rtl = isRTL(line);
          return (
            <div
              key={`${index}-${line}`}
              style={{
                direction: rtl ? 'rtl' : 'ltr',
                textAlign: rtl ? 'right' : 'left',
                fontFamily: `'${FONT_FAMILY}', 'Segoe UI', Tahoma, Arial, sans-serif`,
                fontSize,
                lineHeight: 1.32,
                fontWeight: 900,
                color: '#fff',
                background: 'rgba(8, 14, 26, 0.78)',
                borderRight: '10px solid #d6b35a',
                padding: `${Math.round(fontSize * 0.18)}px ${Math.round(fontSize * 0.48)}px`,
                boxShadow: '0 18px 50px rgba(0, 0, 0, 0.42)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {line}
            </div>
          );
        })}
      </div>
    </>
  );
};

const MutabaatSlideScene: React.FC<{
  slide: MutabaatSlide;
  overlayUrl: string;
  textBottomOffset: number;
  textFontSize: number;
}> = ({ slide, overlayUrl, textBottomOffset, textFontSize }) => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 375], [1.02, 1.11], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#05070d' }}>
      {slide.imageUrl ? (
        <>
          <Img
            src={slide.imageUrl}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'blur(24px) brightness(0.64)',
              transform: 'scale(1.12)',
            }}
          />
          <Img
            src={slide.imageUrl}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${zoom})`,
              transformOrigin: 'center center',
            }}
          />
        </>
      ) : null}

      <AbsoluteFill style={{ pointerEvents: 'none' }}>
        <VideoLayer
          src={overlayUrl}
          muted
          loop
          style={{ width: '100%', height: '100%', objectFit: 'fill' }}
        />
      </AbsoluteFill>

      <SlideText text={slide.text || ''} bottomOffset={textBottomOffset} fontSize={textFontSize} />
    </AbsoluteFill>
  );
};

export const MutabaatComposition: React.FC<MutabaatProps> = ({
  slides,
  overlayUrl,
  finalOverlayUrl,
  bgMusicUrl,
  bgMusicVolume = 0.35,
  textBottomOffset = 130,
  textFontSize = 54,
}) => {
  const normalizedSlides = Array.isArray(slides) ? slides : [];
  let from = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      <Audio src={bgMusicUrl || DEFAULT_MUSIC} volume={bgMusicVolume} loop />
      {normalizedSlides.map((slide, index) => {
        const durationMs = getMutabaatSlideDurationMs(index, normalizedSlides.length, slide.durationMs);
        const durationInFrames = Math.max(1, Math.round((durationMs / 1000) * FPS));
        const sequenceFrom = from;
        from += durationInFrames;
        const slideOverlay = index === normalizedSlides.length - 1
          ? (finalOverlayUrl || DEFAULT_FINAL_OVERLAY)
          : (overlayUrl || DEFAULT_OVERLAY);

        return (
          <Sequence key={slide.id || index} from={sequenceFrom} durationInFrames={durationInFrames} layout="none">
            <MutabaatSlideScene
              slide={slide}
              overlayUrl={slideOverlay}
              textBottomOffset={textBottomOffset}
              textFontSize={textFontSize}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

