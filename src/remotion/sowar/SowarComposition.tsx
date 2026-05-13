import React from 'react';
import {
  AbsoluteFill,
  Audio,
  getRemotionEnvironment,
  Img,
  OffthreadVideo,
  Sequence,
  Video,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { VisualEffects } from '../VisualEffects';
import { SOWAR_TEXT_PRESETS, type SowarBlurRegion, type SowarProps } from './types';

const FONT_FAMILY = 'AvenirArabic';
if (typeof document !== 'undefined') {
  const fontUrl = staticFile('assets/fonts/alfont_com_AlFont_com_AvenirArabic-Heavy.otf');
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-family: '${FONT_FAMILY}';
      src: url('${fontUrl}') format('opentype');
      font-weight: bold;
      font-style: normal;
      font-display: block;
    }
  `;
  if (!document.head.querySelector('[data-font="AvenirArabic-Sowar"]')) {
    style.setAttribute('data-font', 'AvenirArabic-Sowar');
    document.head.appendChild(style);
  }
}

const TYPEWRITER_START = 10;
const FRAMES_PER_CHAR = 1;
const CURSOR_BLINK_RATE = 8;
const IS_PLAYER = getRemotionEnvironment().isPlayer;
const COMPOSITION_WIDTH = 1920;
const COMPOSITION_HEIGHT = 1080;

const isRTL = (s: string) => /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(s);

type AdaptiveVideoProps = React.ComponentProps<typeof Video>;

const AdaptiveVideo: React.FC<AdaptiveVideoProps> = (props) => {
  if (!props.src) {
    return null;
  }

  if (IS_PLAYER) {
    return <Video {...props} />;
  }

  return <OffthreadVideo {...(props as React.ComponentProps<typeof OffthreadVideo>)} />;
};

const buildCenteredImageStyle = ({
  objectFit,
  transform,
  filter,
}: {
  objectFit: React.CSSProperties['objectFit'];
  transform?: string;
  filter?: string;
}): React.CSSProperties => {
  const style: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit,
    objectPosition: 'center center',
    transform,
    transformOrigin: 'center center',
    filter,
  };

  if (!IS_PLAYER) {
    style.position = 'absolute';
    style.inset = 0;
  }

  return style;
};

const SowarSubtitle: React.FC<{
  text: string;
  bottomOffset: number;
  fontSize: number;
  preset: SowarProps['textPreset'];
  animationType?: 'motion-blur' | 'typewriter';
}> = ({ text, bottomOffset, fontSize, preset, animationType = 'motion-blur' }) => {
  const frame = useCurrentFrame();
  const { bg, color, border } = SOWAR_TEXT_PRESETS[preset] ?? SOWAR_TEXT_PRESETS.dark;
  const segmenter = React.useMemo(() => new Intl.Segmenter('ar', { granularity: 'grapheme' }), []);
  const segments = React.useMemo(() => Array.from(segmenter.segment(text.normalize('NFC'))).map((s) => s.segment), [text, segmenter]);
  const isTypewriter = animationType === 'typewriter';
  const charsToShow = Math.min(segments.length, Math.max(0, Math.floor((frame - TYPEWRITER_START) / FRAMES_PER_CHAR)));
  const visibleText = isTypewriter ? segments.slice(0, charsToShow).join('') : text;
  const visibleLines = visibleText.split('++').map((line) => line.trim()).filter(Boolean);
  const isTyping = isTypewriter && charsToShow < segments.length;
  const cursorOn = isTyping && Math.floor(frame / CURSOR_BLINK_RATE) % 2 === 0;
  const xOffset = interpolate(frame, [0, 210], [0, 222], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gradientHeight = Math.max(20, Math.round((bottomOffset / 1080) * 100) + 12);

  if (!text.trim()) return null;

  return (
    <>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: `${gradientHeight}%`,
          background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 100%)',
          opacity: frame > 10 ? Math.min(1, (frame - 10) / 10) : 0,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: `${bottomOffset}px`,
          left: '20%',
          width: 'max-content',
          maxWidth: '75%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '12px',
          transform: `translateX(${xOffset}px)`,
        }}
      >
        {visibleLines.map((lineText, index) => {
          const lineDelay = isTypewriter ? 10 : 10 + index * 15;
          const lineRelativeFrame = Math.max(0, frame - lineDelay);
          const lineOpacity = Math.min(1, lineRelativeFrame / 12);
          const lineYOffset = isTypewriter ? 0 : interpolate(lineRelativeFrame, [0, 18], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const lineBlur = isTypewriter ? 0 : interpolate(lineRelativeFrame, [0, 18], [15, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const rtl = isRTL(lineText);
          const isCurrentTypingLine = isTyping && index === visibleLines.length - 1;
          return (
            <div
              key={`${index}-${lineText}`}
              style={{
                opacity: lineOpacity,
                filter: lineBlur ? `blur(${lineBlur}px)` : 'none',
                transform: `translateY(${lineYOffset}px)`,
                backgroundColor: bg,
                color,
                padding: `${Math.round(fontSize * 0.15)}px ${Math.round(fontSize * 0.45)}px`,
                borderRadius: 0,
                fontSize: `${fontSize}px`,
                fontFamily: `'${FONT_FAMILY}', 'Segoe UI', Tahoma, Arial, sans-serif`,
                fontWeight: 'bold',
                textAlign: rtl ? 'right' : 'left',
                lineHeight: 1.4,
                boxShadow: '0 8px 32px rgba(0,0,0,0.55)',
                border: `1px solid ${border}`,
                backdropFilter: 'blur(8px)',
                direction: rtl ? 'rtl' : 'ltr',
                letterSpacing: '0.5px',
                overflow: 'hidden',
                position: 'relative',
                maxWidth: '100%',
              }}
            >
              {lineText.trim()}
              {isCurrentTypingLine && cursorOn ? (
                <span style={{ display: 'inline-block', width: '3px', height: '0.85em', backgroundColor: color, marginRight: '4px', verticalAlign: 'middle', opacity: 0.8 }} />
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
};

const SegmentImageLayer: React.FC<{
  src: string;
  fitMode: SowarProps['fitMode'];
  imageScale: number;
  imageX: number;
  imageY: number;
  imageMotionEnabled?: boolean;
  imageMotionStartY?: number;
  imageMotionEndY?: number;
  blurBackgroundAmount: number;
  backgroundScale: number;
}> = ({
  src,
  fitMode,
  imageScale,
  imageX,
  imageY,
  imageMotionEnabled,
  imageMotionStartY = 0,
  imageMotionEndY = 0,
  blurBackgroundAmount,
  backgroundScale,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const motionY = imageMotionEnabled
    ? interpolate(frame, [0, durationInFrames], [imageMotionStartY, imageMotionEndY], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;
  const currentY = imageY + motionY;
  const sharedTransform = `scale(${imageScale}) translateX(${imageX}px) translateY(${currentY}px)`;
  const entryOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000', opacity: entryOpacity }}>
      {fitMode === 'blurred-background' ? (
        <>
          <Img
            src={src}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
              transform: `scale(${backgroundScale})`,
              filter: `blur(${blurBackgroundAmount}px) brightness(0.85)`,
              opacity: entryOpacity,
            }}
          />
          <AbsoluteFill
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <Img
              src={src}
              style={buildCenteredImageStyle({
                objectFit: 'contain',
                transform: sharedTransform,
              })}
            />
          </AbsoluteFill>
        </>
      ) : (
        <AbsoluteFill
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Img
            src={src}
            style={buildCenteredImageStyle({
              objectFit: fitMode === 'cover' ? 'cover' : 'contain',
              transform: sharedTransform,
            })}
          />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

const buildBlurRegionMask = ({
  width,
  height,
  regionWidth,
  regionHeight,
  bleed,
  radius,
  feather,
}: {
  width: number;
  height: number;
  regionWidth: number;
  regionHeight: number;
  bleed: number;
  radius: number;
  feather: number;
}) => {
  const safeWidth = Math.max(1, width);
  const safeHeight = Math.max(1, height);
  const safeRegionWidth = Math.max(1, regionWidth);
  const safeRegionHeight = Math.max(1, regionHeight);
  const safeRadius = Math.min(radius, safeRegionWidth / 2, safeRegionHeight / 2);
  const stdDeviation = Math.max(0.1, feather / 2);
  const innerInset = feather > 0 ? Math.min(feather, safeRegionWidth / 2, safeRegionHeight / 2) : 0;
  const innerWidth = Math.max(0, safeRegionWidth - innerInset * 2);
  const innerHeight = Math.max(0, safeRegionHeight - innerInset * 2);
  const innerRadius = Math.max(0, safeRadius - innerInset);
  const filter = feather > 0
    ? `<filter id="feather" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="${stdDeviation}" /></filter>`
    : '';
  const featheredRect = feather > 0
    ? `<rect x="${bleed}" y="${bleed}" width="${safeRegionWidth}" height="${safeRegionHeight}" rx="${safeRadius}" ry="${safeRadius}" fill="white" filter="url(#feather)" />`
    : `<rect x="${bleed}" y="${bleed}" width="${safeRegionWidth}" height="${safeRegionHeight}" rx="${safeRadius}" ry="${safeRadius}" fill="white" />`;
  const solidCenter = feather > 0 && innerWidth > 0 && innerHeight > 0
    ? `<rect x="${bleed + innerInset}" y="${bleed + innerInset}" width="${innerWidth}" height="${innerHeight}" rx="${innerRadius}" ry="${innerRadius}" fill="white" />`
    : '';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${safeWidth}" height="${safeHeight}" viewBox="0 0 ${safeWidth} ${safeHeight}"><defs>${filter}</defs>${featheredRect}${solidCenter}</svg>`;

  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
};

const FullFrameBlurredImageClone: React.FC<{
  sourceUrl: string;
  fitMode: SowarProps['fitMode'];
  imageScale: number;
  imageX: number;
  imageY: number;
  backgroundScale: number;
  blurBackgroundAmount: number;
  blurAmount: number;
  cropX: number;
  cropY: number;
}> = ({
  sourceUrl,
  fitMode,
  imageScale,
  imageX,
  imageY,
  backgroundScale,
  blurBackgroundAmount,
  blurAmount,
  cropX,
  cropY,
}) => (
  <div
    style={{
      position: 'absolute',
      left: -cropX,
      top: -cropY,
      width: COMPOSITION_WIDTH,
      height: COMPOSITION_HEIGHT,
      filter: `blur(${blurAmount}px)`,
    }}
  >
    <SegmentImageLayer
      src={sourceUrl}
      fitMode={fitMode}
      imageScale={imageScale}
      imageX={imageX}
      imageY={imageY}
      blurBackgroundAmount={blurBackgroundAmount}
      backgroundScale={backgroundScale}
    />
  </div>
);

const BlurRegionOverlay: React.FC<{
  region: SowarBlurRegion;
  currentMs: number;
  sourceUrl: string;
  fitMode: SowarProps['fitMode'];
  imageScale: number;
  imageX: number;
  imageY: number;
  backgroundScale: number;
  blurBackgroundAmount: number;
}> = ({
  region,
  currentMs,
  sourceUrl,
  fitMode,
  imageScale,
  imageX,
  imageY,
  backgroundScale,
  blurBackgroundAmount,
}) => {
  const borderRadius = Math.max(0, region.radius ?? 12);
  const feather = Math.max(0, Math.min(80, region.feather ?? 0));
  const blurAmount = Math.max(0, region.blur);
  const bleed = Math.max(24, region.blur * 2, region.feather ?? 0);
  const motionStartMs = Number(region.startMs ?? 0);
  const motionEndMs = Number(region.endMs ?? motionStartMs);
  const motionProgress = region.motionEnabled && motionEndMs > motionStartMs
    ? Math.max(0, Math.min(1, (currentMs - motionStartMs) / (motionEndMs - motionStartMs)))
    : 0;
  const animatedX = region.x + ((region.endX ?? region.x) - region.x) * motionProgress;
  const animatedY = region.y + ((region.endY ?? region.y) - region.y) * motionProgress;
  const cropX = animatedX - bleed;
  const cropY = animatedY - bleed;
  const cropWidth = region.width + bleed * 2;
  const cropHeight = region.height + bleed * 2;
  const maskImage = React.useMemo(
    () => buildBlurRegionMask({
      width: cropWidth,
      height: cropHeight,
      regionWidth: region.width,
      regionHeight: region.height,
      bleed,
      radius: borderRadius,
      feather,
    }),
    [borderRadius, bleed, cropHeight, cropWidth, feather, region.height, region.width],
  );
  const style: React.CSSProperties = {
    position: 'absolute',
    left: cropX,
    top: cropY,
    width: cropWidth,
    height: cropHeight,
    pointerEvents: 'none',
    overflow: 'hidden',
    WebkitMaskImage: maskImage,
    maskImage,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskSize: '100% 100%',
    maskSize: '100% 100%',
    WebkitMaskPosition: '0 0',
    maskPosition: '0 0',
  };

  return (
    <div data-sowar-blur-region={region.id} style={style}>
      <FullFrameBlurredImageClone
        sourceUrl={sourceUrl}
        fitMode={fitMode}
        imageScale={imageScale}
        imageX={imageX}
        imageY={imageY}
        backgroundScale={backgroundScale}
        blurBackgroundAmount={blurBackgroundAmount}
        blurAmount={blurAmount}
        cropX={cropX}
        cropY={cropY}
      />
    </div>
  );
};

const regionIsActive = (region: SowarBlurRegion, segmentStartMs: number, localFrame: number, fps: number) => {
  if (region.alwaysOn !== false) return true;
  const currentMs = segmentStartMs + (localFrame / fps) * 1000;
  const startMs = Number(region.startMs ?? segmentStartMs);
  const endMs = Number(region.endMs ?? segmentStartMs);
  if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || endMs <= startMs) {
    return true;
  }
  return currentMs >= startMs && currentMs <= endMs;
};

const SegmentScene: React.FC<{
  segmentStartMs: number;
  mainImageUrl: string | null;
  blurRegions: SowarBlurRegion[];
  fitMode: SowarProps['fitMode'];
  imageScale: number;
  imageX: number;
  imageY: number;
  imageMotionEnabled?: boolean;
  imageMotionStartY?: number;
  imageMotionEndY?: number;
  backgroundScale: number;
  blurBackgroundAmount: number;
}> = ({
  segmentStartMs,
  mainImageUrl,
  blurRegions,
  fitMode,
  imageScale,
  imageX,
  imageY,
  imageMotionEnabled,
  imageMotionStartY,
  imageMotionEndY,
  backgroundScale,
  blurBackgroundAmount,
}) => {
  const localFrame = useCurrentFrame();
  const currentMs = segmentStartMs + (localFrame / 25) * 1000;

  return (
    <AbsoluteFill>
      {mainImageUrl ? (
        <SegmentImageLayer
          src={mainImageUrl}
          fitMode={fitMode}
          imageScale={imageScale}
          imageX={imageX}
          imageY={imageY}
          imageMotionEnabled={imageMotionEnabled}
          imageMotionStartY={imageMotionStartY}
          imageMotionEndY={imageMotionEndY}
          blurBackgroundAmount={blurBackgroundAmount}
          backgroundScale={backgroundScale}
        />
      ) : null}

      {blurRegions.map((region) =>
        mainImageUrl && regionIsActive(region, segmentStartMs, localFrame, 25) ? (
          <BlurRegionOverlay
            key={`${segmentStartMs}-${region.id}`}
            region={region}
            currentMs={currentMs}
            sourceUrl={mainImageUrl}
            fitMode={fitMode}
            imageScale={imageScale}
            imageX={imageX}
            imageY={imageY}
            backgroundScale={backgroundScale}
            blurBackgroundAmount={blurBackgroundAmount}
          />
        ) : null,
      )}
    </AbsoluteFill>
  );
};

export const SowarComposition: React.FC<SowarProps> = ({
  mainImageUrl,
  frameUrl,
  mainText,
  imageScale,
  imageX,
  imageY,
  imageMotionEnabled,
  imageMotionStartY,
  imageMotionEndY,
  effects,
  textBottomOffset,
  textFontSize,
  textPreset,
  textAnimationType = 'motion-blur',
  cinematicBarSize = 6,
  bgMusicUrl,
  bgMusicVolume = 0.25,
  fitMode,
  blurBackgroundAmount = 36,
  backgroundScale = 1.18,
  segments,
  blurRegions,
}) => {
  const isImageFrame = frameUrl ? /\.(png|gif|jpg|jpeg|webp)$/i.test(frameUrl) : false;

  const normalizedSegments = React.useMemo(
    () => (Array.isArray(segments) ? segments : []).filter((segment) => Number.isFinite(segment.startMs) && Number.isFinite(segment.endMs) && segment.endMs > segment.startMs),
    [segments],
  );

  const sequenceDurations = React.useMemo(
    () => normalizedSegments.map((segment) => Math.max(1, Math.round(((segment.endMs - segment.startMs) / 1000) * 25))),
    [normalizedSegments],
  );

  let accumulatedFrom = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000', direction: 'ltr' }}>
      {bgMusicUrl ? <Audio src={bgMusicUrl} volume={bgMusicVolume ?? 0.25} /> : null}

      {normalizedSegments.map((segment, index) => {
        const durationInFrames = sequenceDurations[index];
        const sequenceFrom = accumulatedFrom;
        accumulatedFrom += durationInFrames;

        return (
          <Sequence key={segment.id || index} from={sequenceFrom} durationInFrames={durationInFrames} layout="none">
            <SegmentScene
              segmentStartMs={segment.startMs}
              mainImageUrl={mainImageUrl}
              blurRegions={blurRegions}
              fitMode={fitMode}
              imageScale={imageScale}
              imageX={imageX}
              imageY={imageY}
              imageMotionEnabled={imageMotionEnabled}
              imageMotionStartY={imageMotionStartY}
              imageMotionEndY={imageMotionEndY}
              backgroundScale={backgroundScale}
              blurBackgroundAmount={blurBackgroundAmount}
            />
          </Sequence>
        );
      })}

      {frameUrl ? (
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
          {isImageFrame ? (
            <Img src={frameUrl} style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
          ) : (
            <AdaptiveVideo src={frameUrl} muted style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
          )}
        </AbsoluteFill>
      ) : null}

      <SowarSubtitle
        text={mainText}
        bottomOffset={textBottomOffset}
        fontSize={textFontSize}
        preset={textPreset}
        animationType={textAnimationType}
      />

      <VisualEffects effects={effects} cinematicBarSize={cinematicBarSize} />
    </AbsoluteFill>
  );
};
